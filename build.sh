#!/bin/sh
set -e
npm run lint
docker build -t belligerator/koala-backend:prod .
docker push belligerator/koala-backend:prod
