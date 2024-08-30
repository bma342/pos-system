#!/bin/sh

# Run any pre-start commands you need here, e.g., migrations or seeds
echo "Starting backend service..."

# Start the Node.js server
exec "$@"
