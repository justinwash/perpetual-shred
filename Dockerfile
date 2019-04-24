FROM node:10.15.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Run 'npm install' in backend directory
WORKDIR /usr/src/app/backend
RUN npm install

# Run 'npm install' in frontend directory
WORKDIR /usr/src/app/frontend
RUN npm install

# Go back to the  app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Run it!
EXPOSE 3000
CMD [ "npm", "start" ]