FROM node:20-alpine

WORKDIR /app

COPY ../../app/package.json ./
COPY ../../app/yarn.lock ./

CMD yarn; yarn build; yarn start:prod;
