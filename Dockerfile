FROM node:10.15.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY backend/package*.json ./backend/

# Run 'npm install' in backend directory
WORKDIR /usr/src/app/backend
RUN npm install

# Go back to the  app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Run it!
WORKDIR /usr/src/app/backend
CMD [ "npm", "start" ]