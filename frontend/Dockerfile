# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
RUN apk add --no-cache curl bash

# Copy built files and nginx configuration
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl /etc/nginx/ssl

# Set correct permissions
RUN chmod 644 /etc/nginx/conf.d/default.conf
RUN chmod 600 /etc/nginx/ssl/server.key
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

# Debugging: List contents of important directories
RUN echo "Contents of /etc/nginx/conf.d:" && ls -la /etc/nginx/conf.d/
RUN echo "Contents of /usr/share/nginx/html:" && ls -la /usr/share/nginx/html
RUN echo "Contents of /etc/nginx/ssl:" && ls -la /etc/nginx/ssl

# Debugging: Print nginx configuration
RUN echo "Nginx configuration:" && cat /etc/nginx/conf.d/default.conf

# Expose port 443 for HTTPS
EXPOSE 443

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -k -f https://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
