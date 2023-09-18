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

bash $WD/src/Aria.Server/build.sh
bash $WD/src/Aria.Client/build.sh

# Start local setup
if [ -f "$WD/local/setup.sh" ] 
then
    sh $WD/local/setup.sh
else
    echo "No Local setup found"
fi

