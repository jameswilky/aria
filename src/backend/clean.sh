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

dotnet clean
sudo find ./ -type f \( -name "openapi.json" -o -name "aria.db" \) -exec rm -rf {} \;
sudo find ./ -type d \( -name "bin" -o -name "obj" \) -exec rm -rf {} \;