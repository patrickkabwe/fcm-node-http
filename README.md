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
import { FCM } from "@kazion/fcm-node-http";
```

### Send a message

```ts
import { AxiosError } from "axios";
import { FCM } from "@kazion/fcm-node-http";

const fcm = new FCM("creds.json");

const fcmToken = "ee8-TV2BT7ucVYjesxPXdD:APA91bFQvY5sZdn6n1PW3kr...";

const main = async () => {
  try {
    const message = {
      notification: {
        body: "body",
        title: "title",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/120px-React-icon.svg.png",
      },
    };
    await fcm.send(fcmToken, message);
  } catch (error: any) {
    if (error instanceof AxiosError) console.log("error", error.response?.data);
    else console.log("error", error);
  }
};

main();
```

### Send a message to multiple tokens

```ts
import { AxiosError } from "axios";
import { FCM } from "@kazion/fcm-node-http";

const fcm = new FCM("creds.json");

const fcmToken1 = "ee8-TV2BT7ucVYjesxPXdD:APA91bFQvY5sZdn6n1PW3kr...";
const fcmToken2 = "ee8-TV2BT7ucVYjesxPXdD:APA91bFQvY5sZdn6n1PW3kr...";

const main = async () => {
  try {
    const message = {
      notification: {
        body: "body",
        title: "title",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/120px-React-icon.svg.png",
      },
    };
    await fcm.send([fcmToken1, fcmToken2], message);
  } catch (error: any) {
    if (error instanceof AxiosError) console.log("error", error.response?.data);
    else console.log("error", error);
  }
};

main();
```

Feel free to contribute to this project by submitting a [pull request](https://github.com/Kazion500/fcm-node-http).

## Acknowledgements

This project was inspired by [fcm-node](https://www.npmjs.com/package/fcm-node)

## License

This project is licensed under the terms of the MIT license.

## Support

If you have any questions, please [open an issue](https://github.com/Kazion500/fcm-node-http/issues)

## Author & Maintainer

This project was created by [Patrick Kabwe](https://github.com/Kazion500)
