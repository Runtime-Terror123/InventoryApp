# Using the node 22.14.0 image
FROM node:22.14.0

# Copy files into the container
COPY . .

# run npm install
RUN npm install

# expose port 3000 from the container to the host
EXPOSE 3000

# run npm start
CMD [ "node", "server.js" ]