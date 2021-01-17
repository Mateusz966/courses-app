FROM node:14.15.4-buster
RUN mkdir -p /backend
RUN mkdir -p /types
COPY /types /types
COPY backend/package.json /backend
RUN cd /backend && npm install
COPY /backend /backend
CMD [ "npm", "--prefix", "/backend", "run" , "start:dev" ]
