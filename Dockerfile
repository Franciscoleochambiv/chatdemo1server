FROM node:14.15.4-alpine3.11

WORKDIR /home/Descargas/chat3/server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8006

CMD npm start
