FROM node:16.13

ARG TOKEN
ENV TOKEN=$TOKEN

ARG CHANNEL_ID
ENV CHANNEL_ID=$CHANNEL_ID

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
