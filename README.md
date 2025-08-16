# Frontend Setup

## Containerized Development

### Prerequisites
- Docker installed on your machine
- Port 3000 available
- Backend container running on port 8000

### Quick Start with Docker
```bash
# Build the frontend container
docker build -t ecommerce-frontend .

# Run the frontend container
docker run -p 3000:3000 ecommerce-frontend
```

The application will be available at `http://localhost:3000/`

### What Happens Automatically
1. **Dependencies**: All npm packages are installed
2. **Development Server**: React development server starts on port 3000
3. **Hot Reload**: Code changes automatically refresh the browser
4. **API Integration**: Ready to communicate with backend container

### Container Management
```bash
# View running containers
docker ps

# View container logs
docker logs <container_id>

# Stop the container
docker stop <container_id>

# Remove the container
docker rm <container_id>
```

## Development Workflow

### Running Both Services
```bash
# Terminal 1: Backend Container
cd backend
docker run -p 8000:8000 ecommerce-backend

# Terminal 2: Frontend Container
cd frontend
docker run -p 3000:3000 ecommerce-frontend
```

### Access Points
- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Product Catalog**: http://localhost:3000 (with backend data)
- **Inventory Management**: http://localhost:3000 (with backend data)

## Features

### Product Management
- **Product Catalog**: Browse all products with filtering and search
- **Category Filtering**: Filter products by category
- **Price Range**: Filter by minimum and maximum price
- **Search**: Search products by name or description
- **Stock Status**: Visual indicators for low stock items

### Inventory Management
- **Stock Overview**: View current stock levels for all products
- **Stock Updates**: Update product quantities in real-time
- **Low Stock Alerts**: Identify products needing restocking
- **Status Indicators**: Color-coded stock levels (low/medium/high)

### API Integration
- **Real-time Data**: Live data from Django backend
- **Error Handling**: Graceful handling of API failures
- **Loading States**: User feedback during data operations
- **Responsive Design**: Works on desktop and mobile devices

## Development Notes

- **Framework**: React 19 with TypeScript
- **Styling**: Styled-components for CSS-in-JS
- **State Management**: React hooks (useState, useEffect)
- **HTTP Client**: Axios for API communication
- **Hot Reload**: Enabled for development experience
- **Type Safety**: Full TypeScript support

## Troubleshooting

### Container Issues
- **Port already in use**: Use different port with `-p 3001:3000`
- **Build fails**: Check Docker logs and ensure all files are present
- **Hot reload not working**: Ensure container has proper file watching

### API Connection Issues
- **Backend not responding**: Ensure backend container is running on port 8000
- **CORS errors**: Backend CORS is configured for localhost:3000
- **Network errors**: Check if both containers are on the same network

