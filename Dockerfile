FROM node:20-alpine

WORKDIR /home/node/app
COPY ./app/package.json .
RUN npm install
RUN npm install web-push nodemon --save

EXPOSE 3000
CMD [ "npx", "nodemon", "app.js" ]

COPY ./app .