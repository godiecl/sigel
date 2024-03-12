FROM node:12


WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@13

RUN npm ci

COPY . .

ENV PORT=4200

EXPOSE 4200 

CMD ["npm","start","--","--host","0.0.0.0"]
