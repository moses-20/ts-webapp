FROM node:14.17.4

COPY dist /usr/src/ts-webapp/dist
COPY assets /usr/src/ts-webapp/assets 

COPY data.json /usr/src/ts-webapp 
COPY server.js /usr/src/ts-webapp
COPY deploy-package.json /usr/src/ts-webapp/package.json 

WORKDIR /usr/src/ts-webapp 

RUN echo 'package-lock=false' >> .npmrc
RUN yarn install 

EXPOSE 4000 

CMD ["node", "server.js"]