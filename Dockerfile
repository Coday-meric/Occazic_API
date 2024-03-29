FROM node:16

WORKDIR /app/occasion_api

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 84

