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

# Start the SvelteKit server
pnpm run build && pnpm run preview &

# Capture the process ID of the SvelteKit server
sveltekit_pid=$!

# Start the C# server
dotnet run --project $WD/../backend/Aria.Server.TestServer/Aria.Server.TestServer.csproj &

# Capture the process ID of the C# server
csharp_pid=$!

# Wait for the SvelteKit server to complete (optional)
wait $sveltekit_pid

# Stop the C# server when the SvelteKit server completes
kill $csharp_pid
