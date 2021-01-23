FROM node:14.15.4-alpine
WORKDIR /app
RUN mkdir -p /app/backend
RUN mkdir -p /app/backend/app-types
RUN mkdir -p /app/app-types
COPY /app-types /app/app-types
COPY backend/app-types /app/backend/app-types
COPY backend/package.json /app/backend
RUN cd /app/backend && npm install
COPY /backend /app/backend
RUN cd /app/backend && npm remove bcrypt && npm install bcrypt
CMD [ "npm", "--prefix", "/app/backend", "run", "start:dev" ]