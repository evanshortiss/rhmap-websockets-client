## RHMAP WebSocket Client Application
This is the corresponding application to the WebSocket server that can be found
[here](https://github.com/evanshortiss/rhmap-websockets-cloud).

## Technology Stack

* Angular v4
* Ionic v3
* socket.io v2

## Prerequisites

* Node.js v4.4.3 or higher
* npm v4 (newer versions are likely ok also)
* Ionic CLI v3.7.0 (this is the only tested version)
* Cordova CLI v6.5.0 (this is the only tested version)


If you need to install node.js then [nvm](https://github.com/creationix/nvm) is
a great way to do so since it will allow you to run multiple node.js versions
concurrently on the same machine across different terminal sessions.

To install the correct npm version, Ionic, and Cordova run the following:

```
npm i npm@4 -g
npm i ionic@3.7 -g
npm i cordova@6.5 -g
```


## Usage
Run the following commands to clone and start the client.

```
git clone $REPO_URL websocket-client
cd websocket-client
npm install
npm run ionic:serve
```

The application should have started in your default web browser, but Chrome and
the iOS WebView are the only browsers tested. Here's what it will look like if
using the Chrome DevTools device emulation:

![](https://raw.githubusercontent.com/evanshortiss/rhmap-websockets-client/master/screenshots/chrome-devtools.png)

### Communicate with a Local Node.js Cloud Application
You will also need to run the Cloud Application in another terminal then append
`?url=http://localhost:8001` to the URL this application is served in your
browser. For example `http://localhost:8100?url=http://localhost:8001. This will
allow the client to communicate with your local Node.js Cloud Application.

### Communicate with a Node.js Server on RHMAP
To have the application communicate with an instance of the Node.js server
deployed on Red Hat Mobile Application Platform you'll need to fill in the
values in `www/fhconfig.json`. You can generate these values from the
_Connections_ screen for a given Project on RHMAP as shown:

![](https://raw.githubusercontent.com/evanshortiss/rhmap-websockets-client/master/screenshots/rhmap-connections.png)

## Issues
Attempting to run this template on iOS Simulator can encounter issues due to a
bug with the `ios-sim` module included in Cordova the generated
`platforms/ios/cordova/node_modules` folder. The error is like so:

```
Error: Cannot read property 'replace' of undefined
```

We've already included the updated `ios-sim` in the `package.json` of this
project, but you need to run the following command to ensure the correct
`ios-sim` is used.

```
rm -rf platforms/ios/cordova/node_modules/ios-sim
```

Or just use the included script like so to work around it:

```
npm run ios-sim
```
