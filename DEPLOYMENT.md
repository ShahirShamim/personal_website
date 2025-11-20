# Deployment Guide

This guide will walk you through setting up your personal website on a home server using Docker and Cloudflare Tunnels.

## Prerequisites

- A server (can be an old laptop, Raspberry Pi, or a dedicated server) running Linux (Ubuntu/Debian recommended).
- A Cloudflare account (Free tier is sufficient).
- Access to your GoDaddy domain settings.
- [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your server.

## Step 1: Move DNS to Cloudflare

To use Cloudflare Tunnels effectively, it is highly recommended to manage your DNS through Cloudflare.

1.  **Create a Cloudflare Account**: Go to [cloudflare.com](https://www.cloudflare.com/) and sign up.
2.  **Add Site**: Click "Add a Site" and enter your domain name (e.g., `yourname.com`).
3.  **Select Plan**: Choose the **Free** plan.
4.  **Review DNS**: Cloudflare will scan your existing records. Review them and click "Continue".
5.  **Change Nameservers**: Cloudflare will provide two nameservers (e.g., `bob.ns.cloudflare.com` and `alice.ns.cloudflare.com`).
    *   Log in to **GoDaddy**.
    *   Go to your domain's DNS Management page.
    *   Find the "Nameservers" section and select "Change".
    *   Choose "Enter my own nameservers (advanced)".
    *   Replace the GoDaddy nameservers with the two provided by Cloudflare.
    *   Save changes.
6.  **Wait**: DNS propagation can take anywhere from a few minutes to 24 hours. Cloudflare will email you when your site is active.

## Step 2: Set up Cloudflare Tunnel

This allows you to expose your locally running website to the internet securely without opening ports on your router.

1.  Log in to the [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/).
2.  Go to **Networks** > **Tunnels**.
3.  Click **Create a Tunnel**.
4.  Select **Cloudflared** as the connector type.
5.  Name your tunnel (e.g., `home-server`).
6.  **Install Connector**: You will see installation commands. **Copy the token** (the long string after `--token`). You will need this for your `.env` file later.
    *   *Note: You don't need to run the install command on your server manually if you use the Docker setup below, but you need that token.*
7.  **Route Traffic**: Click "Next" to configure the tunnel.
    *   **Public Hostname**: Enter your domain (e.g., `www` and `yourdomain.com`).
    *   **Service**: Choose `HTTP` and enter `website:80`. (This matches the service name and port in our `docker-compose.prod.yml`).
    *   **Add Root Domain**: After saving, go back to the tunnel details, click **Public Hostname**, and add a second entry for your root domain (e.g., just `yourdomain.com` without `www`) pointing to the same service `website:80`.
    *   > [!IMPORTANT]
    >   If you get an error saying "An A, AAAA, or CNAME record with that host already exists", go to the **DNS** tab in your Cloudflare dashboard. Delete any existing A, AAAA, or CNAME records for your domain (e.g., `yourdomain.com` or `www.yourdomain.com`) and try again. These were likely imported from GoDaddy and conflict with the new Tunnel.
8.  Save the tunnel.

## Step 3: Prepare Your Server

1.  **Install Docker**: Follow the official instructions for your OS to install Docker Engine and Docker Compose.
2.  **Create Directory**:
    ```bash
    mkdir -p ~/personal_website
    cd ~/personal_website
    ```
3.  **Copy Files**: You need to copy the `deploy/docker-compose.prod.yml` file from this repository to your server. You can do this via `scp` or by creating the file manually.
    ```bash
    # On your server, create the file
    nano docker-compose.yml
    # Paste the contents of deploy/docker-compose.prod.yml here
    ```

## Step 4: Configure Environment

Create a `.env` file in the same directory on your server:

```bash
nano .env
```

Add the following content:

```env
# Your Cloudflare Tunnel Token (from Step 2)
TUNNEL_TOKEN=eyJhIjoi...

# GitHub Container Registry Credentials (for Watchtower to update images)
# GH_USER is your GitHub username (e.g., ShahirShamim)
GH_USER=your_github_username

# GH_PAT is a Personal Access Token. To generate one:
# 1. Go to GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic).
# 2. Click "Generate new token (classic)".
# 3. Give it a name (e.g., "Home Server").
# 4. Select the 'read:packages' scope.
# 5. Click "Generate token" and copy the string starting with 'ghp_'.
GH_PAT=your_github_pat
```

## Step 5: Deploy

1.  **Log in to GitHub Container Registry**:
    You need to authenticate so Docker can pull your private image.
    
    **Option A: Use variables (Recommended)**
    Run these commands to set the variables in your current session.
    **IMPORTANT**: Replace `<YOUR_USERNAME>` and `<YOUR_PAT_TOKEN>` with your actual details before running!
    ```bash
    export GH_USER=<YOUR_USERNAME>
    export GH_PAT=<YOUR_PAT_TOKEN>
    echo $GH_PAT | docker login ghcr.io -u $GH_USER --password-stdin
    ```

    **Option B: One-line command**
    Replace the placeholders directly in the command:
    ```bash
    echo <YOUR_PAT_TOKEN> | docker login ghcr.io -u <YOUR_USERNAME> --password-stdin
    ```

2.  **Run the application**:
    Once you see "Login Succeeded", run:
    ```bash
    docker compose up -d
    ```

This command will:
1.  Pull the latest image of your website from GitHub Container Registry.
2.  Start the website container.
3.  Start the Cloudflare Tunnel container, which connects to Cloudflare using your token.
4.  Start Watchtower, which will automatically check for updates to your image and restart the website if a new version is pushed.

## Continuous Deployment

The repository is configured with GitHub Actions. whenever you push changes to the `main` branch:
1.  GitHub Actions builds a new Docker image.
2.  It pushes the image to GitHub Container Registry (GHCR).
3.  Watchtower (running on your server) detects the new image within a few minutes.
4.  Watchtower pulls the new image and restarts your website container automatically.

## Troubleshooting

-   **Site not loading?** Check the tunnel logs: `docker compose logs cloudflared`.
-   **Updates not happening?** Check Watchtower logs: `docker compose logs watchtower`. Ensure your GH_PAT has the correct permissions.
-   **Error: "no configuration file provided: not found"?** This means you are not in the correct directory or the file is not named `docker-compose.yml`.
    -   Run `ls` to check if `docker-compose.yml` exists in your current folder.
    -   If you named it `docker-compose.prod.yml`, run `docker compose -f docker-compose.prod.yml up -d` instead.
-   **Error: "Conflict. The container name ... is already in use"?**
    -   This means an old version of the container is still there. Run this command to remove it:
        ```bash
        docker rm -f watchtower personal_website cloudflared
        ```
    -   Then try `docker compose up -d` again.
