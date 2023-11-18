## Debugging Playwright Tests

You need to run `xhost +local:` on your **host** (not the container) to allow playwrights debugging tools to work correctly. This will be reset when you reset your PC. To remove access, run `xhost -local:`

Seems to have issues running traceviewer with debug on.

## Debugging the Server code on a remote host

By default the server runs on the same host as the sveltekit app, if you are using rider/visual studio to run the server on your host machine, go to .env and set `ARIA_SERVER_URL` to `'http://host.docker.internal:5156'`

## Vitest tests not in explorer

Rebuild container without cache
