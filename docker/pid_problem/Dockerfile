FROM node:16-alpine

ENV NODE_ENV=production

RUN apk add --no-cache tini

WORKDIR /node

COPY package*.json ./
RUN mkdir app && chown -R node:node .
USER node
RUN npm install && npm cache clean --force

WORKDIR /node/app
COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "-e", "143", "--"]
CMD ["node", "app.js"]
