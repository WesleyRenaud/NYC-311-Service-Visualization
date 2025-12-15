# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps \
   leaflet@^1.9.4 react-leaflet@^4.2.1 \
   @types/leaflet leaflet.markercluster react-leaflet-cluster @types/leaflet.markercluster

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app using react-scripts
CMD ["npm", "start"]
