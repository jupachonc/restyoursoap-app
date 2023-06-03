FROM node:16-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install --production --legacy-peer-deps

COPY . .

RUN npm run build

CMD npm run start
