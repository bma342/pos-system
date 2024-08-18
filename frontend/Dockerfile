# Use an official Node runtime as the parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the current directory contents into the container
COPY . .

# Generate SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./ssl/private.key -out ./ssl/certificate.crt -subj "/C=US/ST=YourState/L=YourCity/O=YourOrganization/OU=YourUnit/CN=localhost"

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["serve", "-s", "build", "-l", "3000", "--ssl-cert", "./ssl/certificate.crt", "--ssl-key", "./ssl/private.key"]
