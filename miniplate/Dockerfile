FROM node:10
EXPOSE 3001

LABEL maintainer="javierdepedrolopez@gmail.com"

# Create directory
WORKDIR /app/miniplate

ADD ./package.json /app/miniplate
RUN npm install

COPY ./ /app/miniplate

CMD npm run start:prod