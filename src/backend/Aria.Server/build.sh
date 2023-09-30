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

dotnet restore
dotnet build
dotnet test
dotnet nswag run nswag.json

# This is a hack to workaround an issue in Nswag where it wont place the extenion classes before 
# the generated files.

# Create temporary files for splitting the content
temp1=$(mktemp)
temp2=$(mktemp)

custom_code_file="../../client/src/lib/server/aria/aria.extensions.ts"
generated_code_file="../../client/src/lib/server/aria/aria.generated.ts"

# Find top of the class declaration in the generated code
line_number=$(grep -n -m 1 'export' $generated_code_file | cut -d: -f1)

# If 'export' is not found, exit the script
if [ -z "$line_number" ]; then
  echo "The word 'export' was not found in $generated_code_file"
  exit 1
fi

# Subtract 2 to find the line above which the content will be inserted
insert_at=$((line_number - 2))

# Split the original file into two parts: one before the insertion point and one after
awk -v line="$insert_at" 'NR <= line' "$generated_code_file" > "$temp1"
awk -v line="$insert_at" 'NR > line' "$generated_code_file" > "$temp2"

# Combine the content of the two files
{
  cat "$temp1"
  cat "$custom_code_file"
  cat "$temp2"
} > "$generated_code_file"

# Remove the temporary files
rm -f "$temp1" "$temp2"

echo "Content inserted successfully."

