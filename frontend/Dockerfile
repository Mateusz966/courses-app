FROM node:14.15.4-buster
WORKDIR /app
RUN mkdir -p /app/frontend
RUN mkdir -p /app/types
COPY /.git /app/.git
COPY /types /app/types
COPY frontend/package.json /app/frontend
RUN cd /app/frontend && npm install
COPY /frontend /app/frontend
CMD [ "npm", "--prefix", "/app/frontend", "start" ]