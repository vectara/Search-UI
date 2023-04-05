FROM --platform=linux/amd64 node:18

WORKDIR /usr/src/app

COPY docker/package.json .
RUN npm install

# Bundle app source
COPY build/ ./build
COPY server ./server

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
