FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=edmon
ENV MYSQL_DATABASE=mydb
WORKDIR /app
COPY schema.sql /docker-entrypoint-initdb.d/
RUN chmod -R 775 /docker-entrypoint-initdb.d/
CMD ["--init-file", "/docker-entrypoint-initdb.d/schema.sql"]
