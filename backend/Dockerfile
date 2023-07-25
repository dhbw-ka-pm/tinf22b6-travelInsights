FROM node:18
WORKDIR /usr/src/app
COPY dist/ .
COPY package.json .
COPY data.sqlite3 .
RUN npm install
EXPOSE 4567
CMD [ "node", "index.js" ]