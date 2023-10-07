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

dotnet tool restore

bash $WD/Aria.Database/build.sh
bash $WD/Aria.Server/build.sh
bash $WD/Aria.Server.Tests/build.sh
dotnet test --logger "trx;LogFileName=test-results.trx"

