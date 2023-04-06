
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY RecipeApp/ ./RecipeApp
COPY restapi2022-S00165540/ ./restapi2022-S00165540
RUN cd RecipeApp && npm run build
