## create ts files

dotnet nswag run nswag.json

## Note about File watch limit

to avoid problems with the debugger, run this on your host machine

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

sudo sysctl -p

```
