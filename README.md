# Curator GUI

## What's this?

Early-stage development and prototyping of the HTML5 UI for 
[Curator](https://github.com/curator-wik/curator), the web install toolkit.

## Usage
If you only want to use Curator, and do not mean to contribute to its development, you 
should use a release build .phar file. There aren't any official releases yet.

### Setting up this application locally for development
This project is built on Zurb's [Foundation for Apps](http://foundation.zurb.com/apps.html),
which in turn is built on AngularJS. It should be runnable by:
  - installing all the things listed on Foundation for Apps'
    [Getting Started](http://foundation.zurb.com/apps/getting-started.html)
    page
  - Running npm install in the repository root
  - Running bower install in the repository root  

Then npm start. Your browser should launch and navigate to `localhost:8079`.

### Pointing curator-gui at a Curator API endpoint
The GUI assumes it is hosted out of a .phar file, and so it first looks for its 
API endpoint at a URL relative to the one that it was served out of. When it is
being hosted by nodejs for development, this doesn't work.

In this case, a dialog appears indicating the server is not connected. You'll need
to provide a server for it to connect to; see "Hosting the source tree in Docker" in
[Curator's README.md](https://github.com/curator-wik/curator/blob/master/README.md)
for the recommended way to bring a development Curator server up.

Once you have a Curator API server up for the gui to interact with, simply click
"Advanced" in the "Server is not connected" dialog, and enter the URL to it in the 
"API Location" textbox. If you followed all these instructions, enter
`http://localhost:8080/dist/web/curator.php/api/v1/`.
  * When using this method, the curator-gui's development server will run on `localhost:8079`
    while the docker-hosted Curator API server will run on `localhost:8080`. In order
    for the browser to permit curator-gui to talk to the API server, the Apache http
    server hosting the API is configured to add CORS headers to responses. 
    If you choose not to use the docker-configured API server, you may need 
    to configure your http server to send these CORS headers.

## License
MIT

Copyright &copy; 2017 Mike Baynton
