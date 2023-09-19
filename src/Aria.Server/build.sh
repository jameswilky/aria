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
dotnet restore
if [ -d "./Services/Database/Models " ]; then
    rm -rf ./Services/Database/Models 

dotnet ef dbcontext scaffold "Data Source=../db/aria.db" Microsoft.EntityFrameworkCore.Sqlite -o Services/Database/Models --force
dotnet build
dotnet test
dotnet nswag run nswag.json