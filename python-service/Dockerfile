FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt flake8

COPY . .

RUN flake8 --config=.flake8

# Run the ingestor when container starts
CMD ["python3", "data_ingestor.py"]