FROM node 

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 1234 

CMD [ "node", "index.js" ]


