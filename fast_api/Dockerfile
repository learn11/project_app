FROM python:3.9-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir fastapi uvicorn pydantic mysql-connector-python[mysql]
EXPOSE 8000
CMD ["uvicorn", "inputapi:app", "--host", "0.0.0.0", "--port", "8000"]

