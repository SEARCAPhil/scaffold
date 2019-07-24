FROM node:8
RUN npm install -g webpack webpack-cli webpack-dev-server
WORKDIR /home/node/app
RUN yarn install
EXPOSE 8080
CMD ["npm", "start"]
