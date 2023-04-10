#Node js base image from the docker image
FROM node:14-alpine
#Creates a working directory within the Docker image
WORKDIR /restapi2022-s00165540

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3000

CMD [ "npm", "start" ]