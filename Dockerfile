FROM node:latest
USER root

WORKDIR /SAMMaruClient
COPY . /SAMMaruClient

RUN npm install
COPY . ./

RUN npm run build