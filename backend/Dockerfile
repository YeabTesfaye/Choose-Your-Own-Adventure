# Use a lightweight Python base
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies (optional but useful for Postgres, bcrypt, etc.)
RUN apt-get update && \
    apt-get install -y build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose FastAPI's default port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
