# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
RUN npm run build:server

# Command to run your application
CMD ["npm", "run", "start:server"]
