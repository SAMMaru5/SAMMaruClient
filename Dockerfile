FROM node:14.17.1
USER root

WORKDIR /SAMMaruClient
COPY . /SAMMaruClient

RUN npm install
COPY . ./

RUN npm run build