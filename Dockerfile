###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.10-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn install --immutable --immutable-cache --check-cache --production=false

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.10-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn run build

RUN rm -rf node_modules && yarn install --frozen-lockfile --production=true

###################
# PRODUCTION
###################

FROM node:20.10-alpine AS production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package*.json ./

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
