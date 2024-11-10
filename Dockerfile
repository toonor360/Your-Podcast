FROM node:22.11.0 AS build

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# production environment
FROM nginx:stable-alpine AS deploy

WORKDIR /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY /nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
