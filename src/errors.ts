import { isAxiosError } from "axios";
import { ErrorType } from "./types";

export const ErrorCode = {
  UNSPECIFIED_ERROR: "No more information is available about this error.",
  INVALID_ARGUMENT:
    "The request contains a bad argument. check the error message for details. https://firebase.google.com/docs/reference/fcm/rest/v1/ErrorCode",
  UNREGISTERED: `The registration token is not valid for the target project. 
- This can happen if the token is: 
1) Invalid. 
2) Associated with a different project. 
3) Not registered with FCM. 
4) Unregistered from FCM. 
5) Deleted from the device.\n`,
  SENDER_ID_MISMATCH: `The registration token is not valid for the target project. 
- This can happen if the token is: 
1) Invalid. 
2) Associated with a different project. 
3) Not registered with FCM. 
4) Unregistered from FCM. 
5) Deleted from the device.\n`,
  QUOTA_EXCEEDED:
    "The project's quota for messages has been exceeded. See https://firebase.google.com/docs/cloud-messaging/quotas for details.",
  UNAVAILABLE:
    "The FCM service is unavailable. See https://firebase.google.com/docs/cloud-messaging/errors for details.",
  INTERNAL: "An internal error has occurred. Retry the request.",
  THIRD_PARTY_AUTH_ERROR:
    "The authentication used to send the message is invalid or has expired. See https://firebase.google.com/docs/cloud-messaging/auth-server for details on generating a new token.",
};

class FCMError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FCMError";
  }
}

export const handleAxiosError = (error: any) => {
  if (isAxiosError(error)) {
    if (error.response?.data?.error?.details?.length) {
      const details = error.response.data.error.details;
      const code = details[0]?.errorCode as ErrorType;

      if (code in ErrorCode) {
        throw new FCMError(ErrorCode[code]);
      } else {
        throw new FCMError(ErrorCode.UNSPECIFIED_ERROR);
      }
    }
  } else {
    throw new FCMError(ErrorCode.UNSPECIFIED_ERROR);
  }
};
