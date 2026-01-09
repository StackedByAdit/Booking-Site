#!/bin/bash
echo "Starting all services..."
docker compose up -d --wait

echo "Waiting for tests to complete..."
docker wait test

echo ""
echo "========== TEST OUTPUT =========="
docker logs test
echo "================================="

echo ""
echo "Performing cleanup..."
docker compose down
