FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Cài đặt wait-for-it để chờ PostgreSQL
RUN apt-get update && apt-get install -y wait-for-it

COPY . .

# Chờ PostgreSQL trước khi chạy ứng dụng
CMD ["wait-for-it", "postgres:5432", "--", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]