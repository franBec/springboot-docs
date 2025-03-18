# Stage 1 - Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm ci

# Copy all files
COPY . .

# Build the project
RUN pnpm run build

# Stage 2 - Serve the application
FROM nginx:1.25-alpine

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]