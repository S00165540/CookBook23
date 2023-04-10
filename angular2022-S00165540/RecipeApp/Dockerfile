# need to use the specific version of node that is dist is built 
FROM node:16.16.0 AS builder

WORKDIR /recipe-app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . /recipe-app/

RUN npm run build  --omit=dev

FROM nginx:latest

COPY --from=builder /recipe-app/dist/recipe-app /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["ng","serve"] sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
