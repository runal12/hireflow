#!/usr/bin/env bash
# ── Render Build Script for HireFlow Backend ────────────────────────────────
# Build Command (in Render dashboard): ./build.sh
# Start Command (in Render dashboard): gunicorn config.wsgi:application

set -o errexit   # Exit immediately on any error
set -o pipefail  # Catch errors in pipes

echo "── Step 1: Installing Python dependencies ──"
pip install -r requirements.txt

echo "── Step 2: Collecting static files ──"
python manage.py collectstatic --noinput

echo "── Step 3: Running database migrations ──"
python manage.py migrate

echo "── Build complete ✓ ──"
