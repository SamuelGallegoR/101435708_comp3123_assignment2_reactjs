# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm ci # Prefer npm ci for consistency

# Copy the application code
COPY . .

# Seed data
RUN node seed.js

# Expose the backend port
EXPOSE 3001

# Define environment variables for production
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://mongo:27017/employeeManagerDB

# Start the application
CMD ["npm", "start"]
