FROM node:alpine AS my-orderreact-build
WORKDIR /orderreact        
COPY package.json ./
COPY . .
RUN npm install

RUN npm install serve --save

ENV  NODE_ENV development
CMD ["npm", "start"]








