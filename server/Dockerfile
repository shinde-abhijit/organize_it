FROM python:3.13

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies first
RUN apt-get update && apt-get install -y libmagic1 && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# Copy Django app
COPY . .

EXPOSE 8000

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
