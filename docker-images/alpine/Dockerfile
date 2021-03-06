ARG BASE_IMAGE_NAME=node
ARG BASE_IMAGE_TAG=8-alpine

FROM ${BASE_IMAGE_NAME}:${BASE_IMAGE_TAG} AS builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache \
    python make gcc g++

WORKDIR /usr/app

COPY package.json .

RUN npm install --only=production

FROM keymetrics/pm2:${BASE_IMAGE_TAG}

LABEL mainteiner="Patricio Perpetua <patricio.perpetua.arg@gmail.com>" \
    name="ravimosharksas/apis/contract/app" \
    architecture="x86_64" \
    vendor="SINGLETON" \
    vcs-type="git" \
    vcs-url="https://gitlab.com/ravimosharksas/apis/contract/app-nodejs.git" \
    distribution-scope="private" \
    Summary="Image to run Ravimoshark Contracts API."

WORKDIR /usr/app

COPY --from=builder /usr/app/node_modules node_modules
COPY src src/
COPY dist dist/
COPY package.json .
COPY tsconfig.json .

ENV NPM_CONFIG_LOGLEVEL warn

COPY assets/environment/.docker.env ./.env

# Show current folder structure in logs
RUN ls -al -R src && ls -al .

#TODO: add script to verify if it is necesary to delete bash bash openssh-keygen openssl outils-sha256.
#maybe 2 types of images, one with binaries and other without
RUN rm -rf /var/cache/apk/*

EXPOSE 8000

CMD [ "npm", "run", "start-pm2" ]
