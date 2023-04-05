
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY RecipeApp/ ./RecipeApp
COPY restapi2022-S00165540/ ./restapi2022-S00165540
RUN cd RecipeApp && npm run build
EXPOSE 4200 3000
CMD ["npm", "run", "start", "--prefix", "restapi2022-S00165540"]