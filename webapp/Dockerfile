# build
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN yarn install && yarn build

# serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80