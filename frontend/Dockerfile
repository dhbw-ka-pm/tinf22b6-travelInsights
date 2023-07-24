FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY build/ .
WORKDIR /
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80