# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
