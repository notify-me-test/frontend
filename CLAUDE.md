# Frontend - E-commerce Application

## Project Overview
This is the **frontend** component of a prototype e-commerce application built with React and TypeScript. The application allows users to browse products, manage inventory, and perform basic e-commerce operations.

## Tech Stack
- **Framework**: React 19.1.1 with TypeScript 4.9.5
- **Styling**: Styled Components 6.1.19
- **Routing**: React Router DOM 7.8.1
- **HTTP Client**: Axios 1.11.0
- **Testing**: Jest with React Testing Library
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Containerization**: Docker with Docker Compose

## Architecture
- **Component Structure**: Organized in `/src/components/` with UI components in `/src/components/ui/`
- **Services**: API calls centralized in `/src/services/api.ts`
- **Types**: TypeScript definitions in `/src/types/index.ts`
- **Testing**: Test files in `__tests__` directories, comprehensive component testing

## Key Features
- Product listing and management
- Inventory management interface
- Product filtering and searching
- Responsive UI components (Cards, Tables, Forms, Buttons)
- API integration with Django backend

## Development Setup
- **Port**: 3000 (configured in docker-compose.yml)
- **Hot Reload**: Enabled with file watching in Docker
- **Testing**: `npm test` for unit tests with watch mode
- **Build**: `npm run build` for production build

## Docker Configuration
- **Development**: `docker compose up -d` starts the development server
- **Image**: Node.js 18 Alpine-based container
- **Volumes**: Hot reload enabled with source code mounting
- **Environment**: Configured with polling for file watching in containers

## Backend Integration
- Communicates with Django REST API backend
- Backend runs on port 8000
- API endpoints for product management and inventory operations

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── __tests__/    # Component tests
│   ├── services/         # API integration
│   ├── types/           # TypeScript definitions
│   └── App.tsx          # Main application
├── public/              # Static assets
├── Dockerfile           # Container definition
├── docker-compose.yml   # Development orchestration
└── package.json         # Dependencies and scripts
```

## Git Commit Rules
- **Commit Title**: Use imperative, concise sentences (e.g., "Add product filtering", "Fix responsive layout")
- **Commit Description**: Use concise bullet points without emojis or casual language
- **No Claude Code Attribution**: Do not include "🤖 Generated with [Claude Code]" or similar attribution in commit messages

## Related Components
- **Backend**: Django REST API with PostgreSQL/SQLite (separate repository)
- **Shared**: Both frontend and backend use Docker for consistent development environments