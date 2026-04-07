FROM --platform=linux/arm64/v8 ruby:3.1-alpine

RUN apk add --no-cache build-base gcc musl-dev linux-headers make g++ libc-dev \
    && gem install jekyll -v 4.2.2 \
    && gem install webrick

WORKDIR /srv/jekyll
EXPOSE 4000 35729
