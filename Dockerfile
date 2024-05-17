FROM node:22.2.0-alpine3.19


WORKDIR /app
COPY . .

RUN yarn install

EXPOSE 3030
CMD ["yarn", "run", "start"]