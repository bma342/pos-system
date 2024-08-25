# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Create ssl directory and copy certificates
RUN mkdir -p ssl
COPY ssl/server.key ssl/server.cert ssl/

# Expose the application port
EXPOSE 5000

# Run the application
CMD ["node", "src/server.js"]
