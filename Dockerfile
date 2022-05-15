FROM node:14.18.0-alpine

WORKDIR /app
COPY . .
RUN yarn install --production
CMD [ "npm", "start"]
