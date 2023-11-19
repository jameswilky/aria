## Developer notes

While this can be used in vscode in the dev container with the aria.backend workspace, you can also use Rider or another
editor too.

To do this, make sure you follow this guide to install dotnet7
https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu#2204

There is also a bug in Rider where it does not point to the correct dotnet path. If you try to run
and see errors saying '.NET not found', make sure you make the following changes:

Edit /etc/dotnet/install_location and /etc/dotnet/install_location_x64
Change /usr/lib/dotnet to /usr/share/dotnet in both files.

## create ts files

dotnet nswag run nswag.json