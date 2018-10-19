FROM node:10

LABEL maintainer="javierdepedrolopez@gmail.com"

# Create directory
WORKDIR /app/

# Install dependencies
ADD package.json /app
RUN npm install

COPY . /app

CMD npm run migrate:local:dev