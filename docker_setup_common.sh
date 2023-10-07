#!/bin/bash

set -e  # Exit on any error

# Get Working directory and Script name
WD=$(cd "$(dirname "$0")" && pwd)
SCRIPT="$(readlink -f "$0")"

cd $WD

echo "===== Executing script $SCRIPT from $PWD ===== "
# Print each command before using it
set -x

###############################################################################################
mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Create debian repo for nodejs
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Get Ubuntu version of.NET and set up Microsoft repository
wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
dpkg -i packages-microsoft-prod.deb 
rm packages-microsoft-prod.deb

# Update the OS
apt-get update && apt-get upgrade -y $$ 

# ============ Software ============

# utilities
apt-get install -y curl gnupg wget git bash tree

# sqlite
apt-get install -y sqlite3 libsqlite3-dev

# node
apt-get install -y nodejs
npm install -g pnpm
pnpm dlx playwright install
pnpm dlx playwright install-deps

# .net
apt-get install -y aspnetcore-runtime-7.0 dotnet-runtime-7.0 dotnet-sdk-7.0