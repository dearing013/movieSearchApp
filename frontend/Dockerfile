FROM node:18.20.2-alpine

WORKDIR /frontend

COPY public/ /frontend/public
COPY src/ /frontend/src
COPY package.json /frontend/

RUN npm install --force

CMD ["npm", "start"]