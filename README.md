# Barcode to PC server

## Useful links

### Downloads

* Server: <https://barcodetopc.com/#download-server>
* Android: <https://play.google.com/store/apps/details?id=com.barcodetopc>
* iOS: <https://itunes.apple.com/app/id1180168368>

### Repositories

* Server: <https://github.com/fttx/barcode-to-pc-server>
* App: <https://github.com/fttx/barcode-to-pc-app>

## Build status

[![Build status](https://ci.appveyor.com/api/projects/status/un8nkjy7755fh7io?svg=true)](https://ci.appveyor.com/project/fttx/barcode-to-pc-server)
[![Build Status](https://travis-ci.org/fttx/barcode-to-pc-server.svg)](https://travis-ci.org/fttx/barcode-to-pc-server)

## Setup

1. Install the required dependencies:
    * Node.js: <https://nodejs.org>
    * RobotJS: <https://github.com/octalmage/robotjs#building>
    * electron-builder: <https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux>
    * node_mdns: <https://github.com/agnat/node_mdns#installation>
2. Clone the repository
    ```bash
    git clone https://github.com/fttx/barcode-to-pc-server/
    cd barcode-to-pc-server
    npm install
    ```
    * If you get errors related to cairo.h:  <https://github.com/SuperiorJT/angular2-qrcode#woah-whats-this-npm-error>
    * If you're building on Windows, you may need to install these packages: 
        * [Bonjour SDK for Windows v3.0](https://developer.apple.com/download/more/) (bonjoursdksetup.exe)
        * [Python 2.7 and Visual C++ Build Environment](https://github.com/nodejs/node-gyp#on-windows)
    * If you're building on macOS, you may need to install these packages: `brew install glib`
    * If you're building on Linux, you may need to install these packages: `sudo apt-get install -y libx11-dev libxtst-dev libpng-dev zlib1g-dev icnsutils graphicsmagick libavahi-compat-libdnssd-dev && sudo snap install snapcraft --classic`
## Release

  ```bash
  npm run dist # build the angular project in prod mode and generate the app install files for the current platform, works with Windows/macOS/Linux. Out dir: dist/dist/
  npm run publish # build the angular project in prod mode and generate the app installer for the current platform and uploads it to GitHub releases
  npm run publish-l  # build the angular project in prod mode, generate the app installer for linux and uploads them to GitHub releases
  npm run publish-w  # build the angular project in prod mode, generate the app installer for Windows ia32 and x64 and uploads them to GitHub releases
  ```

* To sign the installers follow the electron-builder [code-signing tutorial](https://www.electron.build/code-signing). TL;DR: set `CSC_LINK` and `CSC_KEY_PASSWORD` environment variables.
* To enable the publishing to GitHub releases set `GH_TOKEN` environment variable and give all the `repo` permissions
* The installer will be put in the dist/dist/ folder.
* If you get sass errors run `cd ionic && npm rebuild node-sass --force`

## Run

* If you're working on the angular project (src):

```bash
# npm run build     must be called at least once before executing the commands below:

npm start # run electron with dev tools and the webserver with livereload
# use cmd.exe on Windows
```

* If you're working on the electron/main.ts file:

```bash
npm run watch # run the webserver with livereload and also watch the electron/main.ts file
npm run electron:dev # run electron with dev tools or press F5 if you're using VSCode to start debugging
```

## Simulate updates
1. Install minio as explained [here](https://github.com/electron-userland/electron-builder/issues/3053#issuecomment-401001573)
2. Run `./node_modules/.bin/electron-builder --project ./dist/ -c.compression=store --config.publish.provider=s3 --config.publish.endpoint=http://IP:9000 --config.publish.bucket=test-update`

## Publishing updates

The server implements [electron-update](https://www.electron.build/auto-update).

To publish an update:

1. Increase the version number of the package.json
2. Commit & push the changes
3. Add a tag and name it `v<new version number>`
4. Push the tag

Upon the tag push, travis and appveyor will build and sign the new installers. At this point if all looks good the only thing left to do is to publish the Github release draft.