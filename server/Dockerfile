FROM node:12-alpine

# Create app directory
WORKDIR /server
ENV PATH /server/node_modules/.bin:$PATH
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm i -g typescript
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

EXPOSE 5000
CMD [ "npm", "start" ]