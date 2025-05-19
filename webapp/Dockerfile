FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80