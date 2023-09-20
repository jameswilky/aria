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
if [ -f "./aria.db" ]; then
    rm ./aria.db
fi
rm -rf ./Models/* 
rm -rf aria.db

sqlite3 aria.db < tables.sql
dotnet restore
dotnet ef dbcontext scaffold "Data Source=aria.db" Microsoft.EntityFrameworkCore.Sqlite -o Models --force --verbose
dotnet build
dotnet test