FROM node:10.13-alpine

WORKDIR /home/Descargas/chat3/server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8006

CMD npm start
