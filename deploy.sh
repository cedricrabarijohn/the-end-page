#!/bin/bash

# Manual deployment script for cPanel
# Usage: ./deploy.sh username password server remote_dir

# Check if all arguments are provided
if [ "$#" -ne 4 ]; then
    echo "Usage: ./deploy.sh username password server remote_dir"
    echo "Example: ./deploy.sh user pass123 example.com /public_html/"
    exit 1
fi

USERNAME=$1
PASSWORD=$2
SERVER=$3
REMOTE_DIR=$4

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed. Aborting deployment."
    exit 1
fi

# Install ncftpput if not available
if ! command -v ncftpput &> /dev/null; then
    echo "ncftpput is not installed. Please install it with:"
    echo "sudo apt-get install ncftp  # For Debian/Ubuntu"
    echo "brew install ncftp  # For macOS"
    exit 1
fi

# Deploy using FTP
echo "Deploying to cPanel..."
ncftpput -R -v -u "$USERNAME" -p "$PASSWORD" "$SERVER" "$REMOTE_DIR" ./out/*

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "Deployment completed successfully!"
else
    echo "Deployment failed."
    exit 1
fi
