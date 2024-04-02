FROM alpine:latest
WORKDIR /app
COPY . .
RUN apk update && \
    apk add --no-cache nodejs npm
EXPOSE 3000
CMD ["npm", "start"]
