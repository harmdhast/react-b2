FROM node:22-alpine3.19

# INFOS
LABEL version="1.0" maintainer="harmdhast"

# Container working directory
WORKDIR /app

# Copy files in the container
COPY . .

# Create a non-root user to run json-server
RUN addgroup -S appuser && adduser -S appuser -G appuser 
RUN chown appuser:appuser -R /app
# USER appuser

# No effect with json-server
# ENV NODE_ENV production

# Expose json-server port
EXPOSE 4000/tcp

# Install node dependencies
RUN npm install

CMD ["npm", "start"]