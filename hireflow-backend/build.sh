#!/usr/bin/env bash
# Render build script for HireFlow backend

set -o errexit  # Exit on error

pip install -r requirements/base.txt

python manage.py collectstatic --no-input

python manage.py migrate
