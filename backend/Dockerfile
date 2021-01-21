FROM node:14.15.4-alpine
WORKDIR /app
RUN mkdir -p /app/backend
RUN mkdir -p /app/app-types
COPY /app-types /app/app-types
COPY backend/package.json /app/backend
RUN cd /app/backend && npm install
COPY /backend /app/backend
CMD [ "npm", "--prefix", "/app/backend", "run", "start:dev" ]