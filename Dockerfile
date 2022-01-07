FROM node:latest AS build
WORKDIR /build
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install 
COPY public/ public
COPY src/ src
RUN npm run build

