FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl/server.cert /etc/nginx/ssl/server.cert
COPY ssl/server.key /etc/nginx/ssl/server.key
RUN chmod 600 /etc/nginx/ssl/server.key
RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f https://localhost/ || exit 1
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
