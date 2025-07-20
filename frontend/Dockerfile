# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ARG REACT_APP_API_URL
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built app
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]