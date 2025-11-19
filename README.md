# Personal Website - Shahir Shamim

A premium, responsive personal website built with React (Vite) and Docker. Designed for a Product Manager with a passion for AI and Homelabbing.

## Tech Stack

- **Frontend:** React, Vite, Framer Motion, Lucide React
- **Styling:** Vanilla CSS (Modern Variables & Semantic Classes)
- **Containerization:** Docker (Multi-stage build with Nginx)
- **CI/CD:** GitHub Actions -> GitHub Container Registry (GHCR)
- **Deployment:** Home Server via Cloudflare Tunnels

## Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Locally:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Run with Docker (Local):**
   ```bash
   docker-compose up --build
   ```

## Deployment Setup

### 1. GitHub Repository Setup
1. Push this code to a GitHub repository (e.g., `shahirshamim/personal_website`).
2. Go to **Settings > Actions > General** and ensure "Read and write permissions" are enabled for GITHUB_TOKEN.

### 2. Cloudflare Tunnel Setup
1. Go to the [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/).
2. Navigate to **Access > Tunnels** and create a new tunnel.
3. Choose **Docker** as the installation method and copy the **Tunnel Token**.
4. In the **Public Hostnames** tab, add a hostname (e.g., `shahir.work`) and point it to `http://website:80`.

### 3. Home Server Deployment
1. Copy the `deploy` directory to your home server.
2. Create a `.env` file in the `deploy` directory:
   ```env
   TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
   GH_USER=your_github_username
   GH_PAT=your_github_personal_access_token
   ```
   *Note: `GH_PAT` is needed for Watchtower to pull the private image from GHCR. Create a Classic PAT with `read:packages` scope.*

3. Run the deployment:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### 4. Automatic Updates
- The **GitHub Action** will build and push a new image to GHCR on every push to `main`.
- **Watchtower** (running on your home server) will detect the new image, pull it, and restart the website container automatically.

## Project Structure

- `src/`: React source code.
- `src/data.js`: Content for Experience and Homelab sections.
- `src/index.css`: Global styles and design system.
- `Dockerfile`: Production Docker build instructions.
- `.github/workflows/deploy.yml`: CI/CD pipeline.
- `deploy/docker-compose.prod.yml`: Production deployment config.
