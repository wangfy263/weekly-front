FROM nginx

MAINTAINER wangfy <wangfeiyu_@126.com>

COPY dist/ /usr/share/nginx/html/

COPY nginx/nginx.conf /etc/nginx/conf.d/

RUN /bin/bash -c 'echo nginx init ok!!!'