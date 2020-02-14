# TODO build from here as well

FROM node:alpine

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --only=prod
RUN mkdir -p /app/api && cp -a /tmp/node_modules /app/api

WORKDIR /app/api
COPY dist/apps/api /app/api
COPY .env /app/api

CMD [ "node", "main.js" ]

EXPOSE 3000
