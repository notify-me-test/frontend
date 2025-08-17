# E-commerce Frontend Application

A modern React TypeScript application for e-commerce management, featuring a responsive admin interface with product catalog, inventory management, and real-time API integration with the Django backend.

## 🏗️ Project Structure

```
frontend/
├── public/                     # Static assets and HTML template
│   ├── index.html             # Main HTML template
│   └── favicon.ico            # Application icon
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx     # Button component
│   │   │   ├── Card.tsx       # Card component
│   │   │   ├── Input.tsx      # Input field component
│   │   │   ├── Select.tsx     # Dropdown select component
│   │   │   ├── Table.tsx      # Data table component
│   │   │   └── index.ts       # Component exports
│   │   ├── ProductCard.tsx    # Individual product display
│   │   ├── ProductFilterBar.tsx # Product filtering interface
│   │   ├── ProductGrid.tsx    # Product grid layout
│   │   ├── ProductList.tsx    # Main product listing page
│   │   ├── InventoryManager.tsx # Inventory management interface
│   │   └── __tests__/         # Component test files
│   ├── services/              # API service layer
│   │   └── api.ts             # HTTP client and API methods
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Interface definitions
│   ├── App.tsx                # Main application component
│   ├── App.css                # Application styles
│   ├── index.tsx              # Application entry point
│   ├── index.css              # Global styles
│   ├── logo.svg               # Application logo
│   ├── reportWebVitals.ts     # Performance monitoring
│   └── setupTests.ts          # Test configuration
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── tsconfig.json              # TypeScript configuration
├── Dockerfile                 # Container configuration
├── .dockerignore              # Docker ignore patterns
└── .gitignore                 # Git ignore patterns
```

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Option 1: Local Node.js Environment

1. **Clone and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

   The application will open automatically at `http://localhost:3000/`

4. **Ensure backend is running:**
   ```bash
   # In another terminal, start the backend
   cd ../backend
   python manage.py runserver
   # or
   docker run -p 8000:8000 ecommerce-backend
   ```

### Option 2: Docker (Recommended)

1. **Build and run with Docker:**
   ```bash
   # Build the container
   docker build -t ecommerce-frontend .
   
   # Run the container
   docker run -p 3000:3000 ecommerce-frontend
   ```

2. **Or use Docker Compose (from project root):**
   ```bash
   docker-compose up --build
   ```

### What Happens Automatically
- All npm packages are installed
- React development server starts on port 3000
- Hot reload is enabled for instant code updates
- Application connects to backend API
- Browser opens automatically

## 🧪 Running Tests Locally

### Prerequisites
- All dependencies installed (`npm install`)
- Development server not running (tests use different port)

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm test -- --coverage --watchAll=false
```

### Run Specific Test Files
```bash
# Test specific component
npm test -- ProductList.test.tsx

# Test UI components
npm test -- --testPathPattern=ui

# Test with specific pattern
npm test -- --testNamePattern="Button"
```

### Test Structure
- **Component Tests**: Test React component rendering and behavior
- **UI Component Tests**: Test reusable UI components
- **Integration Tests**: Test component interactions
- **API Service Tests**: Test API service layer (if implemented)

## 📡 API Integration

### Backend Connection
- **Base URL**: `http://localhost:8000/api/`
- **CORS**: Configured for localhost:3000
- **HTTP Client**: Axios with interceptors

### Service Layer Architecture
```typescript
// Organized by resource type
productService     // Product CRUD operations
categoryService    // Category management
reviewService      // Product reviews
searchService      // Product search functionality
```

### API Endpoints Used
- **Products**: `/api/products/` (CRUD operations)
- **Categories**: `/api/categories/` (CRUD operations)
- **Reviews**: `/api/reviews/` (CRUD operations)
- **Search**: `/api/search/?q={query}` (Product search)
- **Stock Updates**: `/api/products/{id}/update_stock/`

### Error Handling
- Graceful API failure handling
- User-friendly error messages
- Loading states during operations
- Retry mechanisms for failed requests

## 🏛️ Design Patterns & Architecture

### 1. **Component-Based Architecture**
- **Atomic Design**: UI components organized by complexity
- **Composition**: Components composed of smaller, reusable parts
- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: Well-defined component contracts

### 2. **Service Layer Pattern**
- **API Abstraction**: HTTP client wrapped in service classes
- **Resource Organization**: Services grouped by domain (products, categories, reviews)
- **Error Handling**: Centralized error handling and response processing
- **Type Safety**: Full TypeScript integration for API responses

### 3. **Custom Hooks Pattern**
- **State Management**: Custom hooks for complex state logic
- **API Integration**: Hooks for data fetching and caching
- **Reusability**: Shared logic across components
- **Separation of Concerns**: UI logic separated from business logic

### 4. **Container/Presentational Pattern**
- **Smart Components**: Container components handle data and logic
- **Dumb Components**: Presentational components focus on UI rendering
- **Props Drilling**: Data flows down through component hierarchy
- **Event Bubbling**: User interactions bubble up through callbacks

### 5. **Styled Components Pattern**
- **CSS-in-JS**: Styled components for component-scoped styling
- **Theme Support**: Consistent design system across components
- **Dynamic Styling**: Props-based conditional styling
- **Component Composition**: Styled components compose with regular components

### 6. **TypeScript Integration**
- **Interface Definitions**: Strong typing for all data structures
- **API Contracts**: Type-safe API responses and requests
- **Component Props**: Typed component interfaces
- **Generic Types**: Reusable type definitions

### 7. **State Management**
- **Local State**: React hooks for component state
- **Lifted State**: Shared state moved to common ancestors
- **Effect Hooks**: Side effects for API calls and subscriptions
- **Context API Ready**: Architecture supports React Context for global state

## 🎨 UI Component Library

### Core Components
- **Button**: Configurable button with variants and states
- **Input**: Form input with validation support
- **Select**: Dropdown select with search capability
- **Card**: Content container with consistent styling
- **Table**: Data table with sorting and pagination

### Component Features
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Theme Support**: Consistent color scheme and typography
- **State Management**: Loading, disabled, and error states
- **Customization**: Props-based styling and behavior

## 🔧 Configuration

### TypeScript Configuration
- **Target**: ES5 for broad browser compatibility
- **Strict Mode**: Enabled for type safety
- **JSX**: React JSX transformation
- **Module Resolution**: Node.js module resolution

### Development Server
- **Port**: 3000 (configurable)
- **Hot Reload**: Enabled for development
- **Source Maps**: Enabled for debugging
- **Proxy**: Configured for backend API calls

### Build Configuration
- **Optimization**: Production build optimization
- **Bundle Analysis**: Webpack bundle analyzer
- **Environment Variables**: Configurable via .env files
- **Static Assets**: Optimized asset handling

## 🐳 Docker Configuration

### Container Features
- **Node.js 18 Alpine**: Lightweight base image
- **Hot Reload**: Development server with file watching
- **Port Mapping**: 3000:3000 (host:container)
- **Volume Mounting**: Source code mounted for live updates

### Development Workflow
```bash
# Build and run frontend
docker run -p 3000:3000 -v $(pwd):/app ecommerce-frontend

# Run both services
docker-compose up --build
```

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Use different port
PORT=3001 npm start
# or
docker run -p 3001:3000 ecommerce-frontend
```

#### Backend Connection Issues
- Ensure backend is running on port 8000
- Check CORS configuration in backend
- Verify network connectivity between containers
- Check browser console for CORS errors

#### Build Failures
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check TypeScript compilation errors

#### Test Failures
- Ensure no other processes are using port 3000
- Check test environment setup
- Verify component dependencies are mocked
- Run tests with verbose output: `npm test -- --verbose`

### Useful Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject from Create React App
npm run eject

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

## 📚 Dependencies

### Core Dependencies
- **React 19.1.1**: Modern React with latest features
- **React DOM 19.1.1**: React DOM rendering
- **TypeScript 4.9.5**: Type-safe JavaScript
- **React Router DOM 7.8.1**: Client-side routing
- **Styled Components 6.1.19**: CSS-in-JS styling

### Development Dependencies
- **React Scripts 5.0.1**: Create React App build tools
- **Testing Library**: Component testing utilities
- **Jest**: JavaScript testing framework
- **Web Vitals**: Performance monitoring

### HTTP Client
- **Axios 1.11.0**: Promise-based HTTP client
- **Interceptors**: Request/response transformation
- **Error Handling**: Centralized error management
- **Type Safety**: Full TypeScript support

## 🔒 Security Features

- **CORS Configuration**: Properly configured for development
- **Input Validation**: Client-side validation for user inputs
- **XSS Protection**: React's built-in XSS protection
- **HTTPS Ready**: Configured for secure connections
- **Environment Variables**: Secure configuration management

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile-First**: Responsive design approach
- **Touch-Friendly**: Optimized for touch devices
- **Flexible Layouts**: CSS Grid and Flexbox
- **Progressive Enhancement**: Core functionality on all devices

## 🚀 Performance Features

- **Code Splitting**: Lazy loading for route-based code splitting
- **Bundle Optimization**: Webpack optimization for production
- **Image Optimization**: Optimized image handling
- **Caching**: Browser caching strategies
- **Lazy Loading**: Components loaded on demand

## 🔮 Future Enhancements

- **State Management**: Redux Toolkit or Zustand integration
- **Form Management**: React Hook Form or Formik
- **Data Fetching**: React Query or SWR for server state
- **Authentication**: JWT-based authentication system
- **Real-time Updates**: WebSocket integration
- **PWA Features**: Service workers and offline support
- **Internationalization**: Multi-language support
- **Theme System**: Dark/light mode and custom themes
- **Performance Monitoring**: Advanced analytics and monitoring
- **Testing**: E2E testing with Cypress or Playwright

