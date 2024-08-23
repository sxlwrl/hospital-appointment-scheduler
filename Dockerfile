FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:18-alpine as prod

COPY --from=build /app/dist ./app/dist
COPY --from=build /app/node_modules ./app/node_modules
COPY .env ./app/.env

EXPOSE 80

CMD ["node", "./app/dist/bin/www/server.js"]