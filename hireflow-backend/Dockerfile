FROM python:3.12-slim

WORKDIR /app

COPY . /app

ENV PYTHONPATH=/app

RUN pip install --upgrade pip
RUN pip install -r requirements/base.txt

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]