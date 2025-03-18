FROM node:22

WORKDIR /PiCloud-Server

COPY . .

RUN npm i && npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]

