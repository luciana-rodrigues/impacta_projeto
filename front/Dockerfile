FROM node:alpine3.17
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm i
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]