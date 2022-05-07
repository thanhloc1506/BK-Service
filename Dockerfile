FROM node:14.18.1-alpine AS dev
WORKDIR usr/src/app
COPY package*.json ./
RUN npm install -g serve
CMD serve -s build -l 5000
COPY . .
