FROM node:20.9.0-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

RUN npm install pm2 -g

COPY . .

RUN npm run build

CMD ["pm2-runtime", "--delay", "5", "start", "pm2.json"]
