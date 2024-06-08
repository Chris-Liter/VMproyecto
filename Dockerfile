# Etapa de construcción para el cliente Angular
FROM node:16-alpine AS build

RUN mkdir -p /app
WORKDIR /app

COPY ./Cliente/package.json /app
RUN npm install

COPY ./Cliente/ /app
RUN npm run build --prod

# Etapa para servir la aplicación Angular con NGINX
FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/Cliente /usr/share/nginx/html

# Etapa para el servidor Node.js
