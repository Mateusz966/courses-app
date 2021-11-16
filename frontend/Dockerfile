FROM node:14.15.4-alpine AS builder
WORKDIR /app
RUN mkdir -p /app/frontend
COPY /app-types /app/app-types
COPY /frontend /app/frontend
RUN cd /app/frontend && npm install
COPY /frontend/nginx.conf /app
RUN cd /app/frontend && npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/frontend/build/ /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
RUN chown nginx.nginx /usr/share/nginx/html/ -R