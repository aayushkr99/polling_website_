FROM node:20-alpine3.18

WORKDIR /jeera_client
COPY ./package.json ./

COPY . .

RUN npm install

CMD ["npm", "start"]