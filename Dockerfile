# Use Node.js 18 alpine image as base
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start React development server with hot reload
CMD ["npm", "start"]
