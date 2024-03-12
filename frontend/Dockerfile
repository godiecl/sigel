# docker buildx build --tag sigel/frontend:1.0 .
FROM node:lts-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.5.0
RUN npm install -g @angular/cli@13

RUN npm clean-install

COPY . .

ENV PORT=4200

EXPOSE 4200

CMD ["npm","start","--","--host","0.0.0.0","--disable-host-check","--verbose"]
