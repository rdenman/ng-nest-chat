FROM node:lts-slim as builder

RUN mkdir -p /usr/app/apps/client
WORKDIR /usr/app

COPY package.json /usr/app
COPY package-lock.json /usr/app
COPY angular.json /usr/app
COPY tsconfig.json /usr/app
RUN npm ci

# TODO probably shouldn't copy EVERYTHING over...
COPY . .

RUN npm run build:client

FROM nginx:alpine
COPY --from=builder /usr/app/apps/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist/apps/client /usr/share/nginx/html/

EXPOSE 8080

# FROM nginx:alpine

# RUN rm -rf /usr/share/nginx/html/*
# COPY nginx.conf /etc/nginx/nginx.conf

# COPY dist/apps/client /usr/share/nginx/html

# RUN npm install -g angular-http-server
# COPY dist/apps/client /app/client

# CMD [ "angular-http-server", "--path", "/app/client" ]

# EXPOSE 8080

# CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 80
