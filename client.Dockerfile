FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/client /usr/share/nginx/html

# RUN npm install -g angular-http-server
# COPY dist/apps/client /app/client

# CMD [ "angular-http-server", "--path", "/app/client" ]

# EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
