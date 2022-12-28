# fcm-node-http

[![Build Status](https://travis-ci.org/cedadev/fcm-node-http.svg?branch=main)](https://travis-ci.org/cedadev/fcm-node-http)
[![Coverage Status](https://coveralls.io/repos/github/cedadev/fcm-node-http/badge.svg?branch=master)](https://coveralls.io/github/cedadev/fcm-node-http?branch=main)

A Node.js client for the [FCM HTTP v1 API](https://firebase.google.com/docs/cloud-messaging/http-server-ref).

## Installation

```bash
npm install fcm-node-http
```

## Usage

```js
const FCM = require("fcm-node-http");
```

### Send a message

```js
const fcm = new FCM("PATH_TO_KEY_FILE");

const message = {
  token: "DEVICE_TOKEN",
  notification: {
    title: "Hello",
    body: "World",
  },
};

await fcm.send(message);
```

### Send a message to multiple tokens

```js
const fcm = new FCM("PATH_TO_KEY_FILE");

const message = {
  tokens: ["DEVICE_TOKEN_1", "DEVICE_TOKEN_2"],
  notification: {
    title: "Hello",
    body: "World",
  },
};

await fcm.send(message);
```

### Feel free to contribute to this project by submitting a pull request.

This project is licensed under the terms of the MIT license.

## Acknowledgements

This project was inspired by [fcm-node](https://www.npmjs.com/package/fcm-node)

