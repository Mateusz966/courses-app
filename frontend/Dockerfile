FROM node:14.15.4-buster
RUN mkdir -p /frontend
RUN mkdir -p /types
COPY /types /types
COPY frontend/package.json /frontend
RUN cd /frontend && npm install
COPY /frontend /frontend
CMD [ "npm", "--prefix", "/frontend", "start" ]