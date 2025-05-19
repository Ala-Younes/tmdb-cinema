# Docker Containerization Preview

## Container Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Docker Host                           │
│                                                         │
│  ┌─────────────────────┐      ┌─────────────────────┐   │
│  │                     │      │                     │   │
│  │  Development        │      │  Production         │   │
│  │  Container          │      │  Container          │   │
│  │  (Node.js Alpine)   │      │  (Nginx Alpine)     │   │
│  │                     │      │                     │   │
│  │  - Source code      │      │  - Built static     │   │
│  │  - Hot reloading    │      │    files            │   │
│  │  - Port 3000        │      │  - Port 80          │   │
│  │                     │      │  - Optimized        │   │
│  └─────────────────────┘      └─────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Development Workflow

1. Developer makes changes to the source code
2. Changes are immediately reflected in the development container (hot reloading)
3. Developer commits and pushes changes to GitHub
4. GitHub Actions CI workflow runs:
   - Linting
   - Testing
   - Building
5. For pull requests, a preview deployment is created
6. When merged to main, the CD workflow:
   - Builds a production Docker image
   - Pushes the image to Docker Hub
   - Deploys to production server

## Multi-stage Docker Build Process

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Stage 1: Build                                         │
│  ───────────────                                        │
│  FROM node:18-alpine                                    │
│                                                         │
│  - Copy package files                                   │
│  - Install dependencies                                 │
│  - Copy source code                                     │
│  - Build application                                    │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Stage 2: Production                                    │
│  ─────────────────────                                  │
│  FROM nginx:alpine                                      │
│                                                         │
│  - Copy built files from Stage 1                        │
│  - Copy nginx configuration                             │
│  - Expose port 80                                       │
│  - Start nginx                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## CI/CD Pipeline

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Code Changes   │────▶│  GitHub Actions │────▶│  Docker Hub     │
│                 │     │  CI/CD          │     │  Registry       │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └────────┬────────┘
                                 │                       │
                                 ▼                       ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │                 │     │                 │
                        │  PR Preview     │     │  Production     │
                        │  Deployment     │     │  Deployment     │
                        │                 │     │                 │
                        └─────────────────┘     └─────────────────┘
```

## Running the Containerized Application

### Development Environment

```bash
# Start the development container
npm run docker:dev

# Access the application at http://localhost:3000
```

### Production Environment

```bash
# Start the production container
npm run docker:prod

# Access the application at http://localhost:80
```

## Benefits of Containerization

1. **Consistency**: Same environment across development, testing, and production
2. **Isolation**: Application dependencies are isolated from the host system
3. **Portability**: Run the application on any system with Docker installed
4. **Scalability**: Easily scale the application with container orchestration tools
5. **CI/CD Integration**: Streamlined deployment process with automated testing and building