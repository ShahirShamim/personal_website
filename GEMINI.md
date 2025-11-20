# GEMINI.md

## Project Overview

This is a modern, responsive personal portfolio website for Shahir Shamim, a Product Manager specializing in AI, data analytics, and technical product development. The website showcases professional experience, education, and homelab projects while demonstrating expertise in self-hosting and DevOps practices.

### Purpose

The website serves multiple objectives:
- **Professional Portfolio**: Showcases work experience across product management, data analytics, and research roles
- **Technical Demonstration**: Demonstrates DevOps capabilities through self-hosted infrastructure and automated CI/CD
- **Personal Branding**: Highlights interests in AI, homelabbing, networking, and local model hosting
- **Contact Hub**: Provides multiple channels for professional networking and collaboration

### Key Features

- **Responsive Design**: Mobile-first approach with modern aesthetics using glassmorphism and smooth animations
- **Dynamic Content**: Experience cards, education timeline, and project showcase with interactive elements
- **Performance Optimized**: Multi-stage Docker build, Nginx serving, and optimized asset delivery
- **Self-Hosted**: Runs on personal homelab infrastructure, exposed via Cloudflare Tunnels
- **Automated Updates**: CI/CD pipeline with GitHub Actions and Watchtower for zero-downtime deployments

## Architecture

### Technology Stack

#### Frontend
-   **Framework:** React 19.2.0 - Modern component-based UI library
-   **Build Tool:** Vite 7.2.2 - Fast development server and optimized production builds
-   **Styling:** Vanilla CSS with CSS variables for theming and design system
-   **Animations:** Framer Motion 12.23.24 - Smooth, performant animations and transitions
-   **Icons:** Lucide React 0.554.0 - Consistent, customizable icon set
-   **Language:** Modern JavaScript (ESM) with React 19 features

#### Infrastructure
-   **Containerization:** Docker with multi-stage builds (Node.js build → Nginx serve)
-   **Web Server:** Nginx with optimized configuration for SPA routing and caching
-   **CI/CD:** GitHub Actions for automated builds and deployments
-   **Registry:** GitHub Container Registry (GHCR) for Docker image storage
-   **Orchestration:** Docker Compose for local and production environments
-   **Auto-Updates:** Watchtower for automatic container updates on image changes
-   **Networking:** Cloudflare Tunnels for secure external access without port forwarding
-   **Domain:** GoDaddy domain with Cloudflare DNS management

### Deployment Pipeline

1. **Code Push**: Developer pushes to `main` branch on GitHub
2. **GitHub Actions**: Workflow triggers automatically
   - Authenticates with GHCR using GitHub token
   - Builds multi-stage Docker image
   - Pushes tagged image to GHCR
3. **Watchtower**: Monitors GHCR for new images (runs on homelab server)
   - Detects new image version
   - Pulls updated image
   - Gracefully restarts container with zero downtime
4. **Cloudflare Tunnel**: Routes external traffic to homelab server
   - Provides HTTPS termination
   - Protects homelab IP address
   - Enables access via custom domain

### Project Structure

```
personal_website/
├── src/                          # React application source code
│   ├── components/               # Reusable React components
│   │   ├── ExperienceCard.jsx   # Professional experience display
│   │   ├── EducationCard.jsx    # Education timeline component
│   │   └── HomelabSection.jsx   # Projects/homelab showcase
│   ├── assets/                   # Static assets (images, GIFs)
│   ├── data.js                   # Content data (experience, education, projects)
│   ├── index.css                 # Global styles and design system
│   └── App.jsx                   # Main application component
├── public/                       # Static files served as-is
├── deploy/                       # Production deployment configuration
│   └── docker-compose.prod.yml  # Production Docker Compose with Watchtower
├── .github/workflows/            # CI/CD automation
│   └── deploy.yml               # GitHub Actions deployment workflow
├── Dockerfile                    # Multi-stage Docker build configuration
├── docker-compose.yml           # Local development Docker setup
├── nginx.conf                   # Nginx configuration for production
├── vite.config.js               # Vite build configuration
├── eslint.config.js             # ESLint linting rules
├── package.json                 # Node.js dependencies and scripts
├── DEPLOYMENT.md                # Detailed deployment instructions
└── README.md                    # Project documentation
```

## Building and Running

### Local Development

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173` with hot module replacement.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    Outputs optimized static files to `dist/` directory.

4.  **Lint the code:**
    ```bash
    npm run lint
    ```
    Checks code quality using ESLint.

5.  **Preview the production build:**
    ```bash
    npm run preview
    ```
    Serves the production build locally for testing.

### Docker (Local Testing)

1.  **Build and run the Docker container locally:**
    ```bash
    docker-compose up --build
    ```
    The website will be available at `http://localhost:8080`.
    This uses the same multi-stage build process as production.

2.  **Stop the container:**
    ```bash
    docker-compose down
    ```

### Production Deployment

Production deployment is fully automated via the CI/CD pipeline:

1. **Initial Setup** (one-time):
   - Configure Cloudflare Tunnel on homelab server
   - Set up DNS records pointing to tunnel
   - Deploy `docker-compose.prod.yml` with Watchtower
   - Configure GitHub secrets for GHCR authentication

2. **Ongoing Deployments**:
   - Simply push to `main` branch
   - GitHub Actions builds and pushes new image
   - Watchtower automatically updates running container
   - Zero downtime, no manual intervention required

See `DEPLOYMENT.md` for detailed production setup instructions.

## Development Conventions

### Content Management

All website content is centralized in `src/data.js`:
- **experience**: Array of job positions with company, role, period, and achievements
- **education**: Array of educational qualifications with institution and details
- **homelab**: Array of personal projects and homelab infrastructure

To update content, simply edit the relevant arrays in `data.js`. The components will automatically reflect changes.

### Component Architecture

- **ExperienceCard**: Displays individual job experiences with animated reveal
- **EducationCard**: Shows educational background with institution logos
- **HomelabSection**: Showcases technical projects with tech stack badges
- **App.jsx**: Main layout with hero section, navigation, and content sections

### Styling Approach

The project uses **vanilla CSS** with a modern design system:
- CSS variables for colors, spacing, and typography (defined in `index.css`)
- Semantic class names (e.g., `.glass-card`, `.btn-primary`)
- Mobile-first responsive design with media queries
- Glassmorphism effects and gradient accents
- Smooth transitions and hover states

**Design Principles:**
- Premium, modern aesthetics with vibrant colors
- Consistent spacing using CSS variables
- Accessible color contrast ratios
- Smooth animations without performance impact

### Code Quality

-   **Linting:** ESLint with React-specific rules (see `eslint.config.js`)
-   **Modern JavaScript:** ES modules, arrow functions, destructuring, async/await
-   **React Best Practices:** Functional components, hooks, proper key props
-   **Performance:** Code splitting, lazy loading, optimized re-renders

### Version Control

- **Branching**: Direct commits to `main` trigger deployments
- **Commit Messages**: Descriptive messages with version bumps when applicable
- **Version Tracking**: Footer displays current version (e.g., v1.3)

## CI/CD Pipeline

The automated deployment pipeline is defined in `.github/workflows/deploy.yml`:

### Workflow Triggers
- Pushes to `main` branch
- Manual workflow dispatch (optional)

### Workflow Steps

1. **Checkout Code**: Clones repository
2. **Login to GHCR**: Authenticates using `GITHUB_TOKEN` secret
3. **Build Docker Image**: 
   - Uses multi-stage Dockerfile
   - Stage 1: Node.js build environment
   - Stage 2: Nginx production server
4. **Push to Registry**: Tags and pushes image to `ghcr.io/shahirshamim/personal_website`
5. **Watchtower Detection**: Homelab Watchtower service detects new image
6. **Automatic Update**: Container updates with zero downtime

### Environment Variables

- `GITHUB_TOKEN`: Automatically provided by GitHub Actions for GHCR authentication

## Homelab Infrastructure

The website is hosted on a personal homelab server with the following setup:

- **Server**: Home server running Docker
- **Networking**: Cloudflare Tunnel for secure external access (no port forwarding)
- **DNS**: GoDaddy domain with Cloudflare DNS management
- **Monitoring**: Watchtower for automated container updates
- **Security**: HTTPS via Cloudflare, no exposed ports on home network

This demonstrates practical DevOps skills and self-hosting capabilities, aligning with the website's focus on homelabbing and technical expertise.

## Future Enhancements

Potential improvements and features:
- Blog section for technical articles
- Dark/light theme toggle
- Analytics integration (privacy-focused)
- Contact form with backend API
- Project detail pages with screenshots
- Resume download functionality
- Automated testing (unit and E2E)
- Performance monitoring and optimization
