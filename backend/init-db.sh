#!/bin/sh

echo "Waiting for database to be ready..."
npx prisma migrate deploy

echo "Database migrations completed!" 