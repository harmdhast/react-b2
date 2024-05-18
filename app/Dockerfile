FROM node:22-alpine3.19 AS build

# INFOS
LABEL version="1.0" maintainer="harmdhast"

# Container working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Setup .env
ARG API_HOST
RUN echo "REACT_APP_API_HOST=\"${API_HOST:-http://localhost:4000}\"" > .env

# Build the React app for production
RUN npm run tailwind-build
RUN npm run build

# Use Nginx as the production server
FROM nginx:1.26.0-alpine3.19

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]