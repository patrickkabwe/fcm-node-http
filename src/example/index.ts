import { AxiosError } from "axios";
import { FCM } from "../FCM";

const fcm = new FCM("creds.json");

const main = async () => {
  try {
    await fcm.send({
      message: {
        data: {
          message: "Hello World",
        },
        token: "TOKEN",
      },
    });
    console.log("success sent!");
  } catch (error: any) {
    if (error instanceof AxiosError) console.log("error", error.response?.data);
    else console.log("error", error);
  }
};

main();
