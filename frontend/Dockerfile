FROM node:14.15.4-alpine
WORKDIR /app
RUN mkdir -p /app/frontend
RUN mkdir -p /app/app-types
COPY /app-types /app/app-types
COPY frontend/package.json /app/frontend
RUN cd /app/frontend && npm install
COPY /frontend /app/frontend
CMD [ "npm", "--prefix", "/app/frontend", "start" ]