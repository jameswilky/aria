## create ts files

dotnet nswag run nswag.json


To properly initialize the Dev Container, the default SSH keys need to be added to your local SSH agent. The command `ssh-add -k` will be invoked. If you are using a specific private key, please ensure that the key required for cloning the repository is present in your SSH agent. You can check the added keys using the `ssh-add -l` command.


## Rider Setup
1. Go to devcontainer.json
2. Click on the docker icon and click mount sources
3. Select the 'Rider' IDE and click continue