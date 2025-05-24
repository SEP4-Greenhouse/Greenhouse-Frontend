# build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
