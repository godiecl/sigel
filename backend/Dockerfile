# docker buildx build --tag sigel/backend:1.0 .
FROM node:lts-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.5.0
RUN npm clean-install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm","run","dev"]
