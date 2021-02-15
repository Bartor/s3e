# s3e - simple 3d engine

This is a simple browser based, WebGL 3D rendering engine with scenes, multiple camera support, scene graphs, basic lighting and animations. It is my CS thesis project. It is written in TypeScript and built with Webpack.

This code is a part of my thesis, "3D graphics library for browsers" (Polish: "Grafika do tworzenia grafiki trójwymiarowej w przeglądarkach internetowych"). Full thesis text in Polish can be found [here](./thesis-pl.pdf).

## Live examples

Live examples can be found [here](https://bartor.net/s3e/examples/).

## Requirements

You need:

- Node 14
- (optionally) a HTTP server to serve example files

## Building

To build the project:

- `npm i`
- `npm run build:prod`

The built package and type definitions are saved at ./dist.

To view the included examples:

- statically host the project folder
- navigate to <host root>/examples/index.html in your browser

There will be a list of example pages.
