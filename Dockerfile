FROM node:14.18.1-alpine AS dev
WORKDIR usr/src/app
COPY package*.json ./
RUN apk add --update --no-cache --virtual builds-deps build-base python3 && ln -sf python3 /usr/bin/python
RUN yarn install
RUN npm install -g serve
CMD serve -s build -l 4000
COPY . .