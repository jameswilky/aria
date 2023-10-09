## create ts files

dotnet nswag run nswag.json

## Getting playwright to work

You need to run `xhost +local:` on your host to allow playwrights debugging tools to work correctly. To remove access, run `xhost -local:`
