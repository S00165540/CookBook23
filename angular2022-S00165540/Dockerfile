#Build Front ENd 
FROM node:14-alpine AS client_build

WORKDIR /app

COPY ./RecipeApp /app/

RUN npm install
RUN node_modules/.bin/ng build --configuration production

#Build Backend 
FROM node:14-alpine AS server_build

COPY ./restapi2022-S00165540 /app/
COPY --from=client_build /app/dist/recipe-app /app/dist/recipe-app

RUN npm install --production

#build docker
FROM alpine

WORKDIR /app
RUN apk add --no-cache nodejs

COPY --from=server_build /app ./
EXPOSE 4200 

