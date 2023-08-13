export type FCMPayload = {
  revalidate_only?: boolean;
  message: Message;
};

type Data = Record<string, string>;
type Headers = Data;
type Color = { red: number; green: number; blue: number; alpha: number };

type Notification = {
  title: string;
  body: string;
  image?: string;
};

type AndroidNotification = {
  title: string;
  body: string;
  icon: string;
  color: string;
  sound: string;
  tag: string;
  click_action: string;
  body_loc_key: string;
  body_loc_args: [string];
  title_loc_key: string;
  title_loc_args: [string];
  channel_id: string;
  ticker: string;
  sticky: boolean;
  event_time: string;
  local_only: boolean;
  notification_priority: NotificationPriority;
  default_sound: boolean;
  default_vibrate_timings: boolean;
  default_light_settings: boolean;
  vibrate_timings: [string];
  visibility: Visibility;
  notification_count: number;
  light_settings: LightSettings;
  image: string;
};

type AndroidConfig = {
  collapse_key: string;
  priority: AndroidMessagePriority;
  ttl: string;
  restricted_package_name: string;
  data: Data;
  notification: AndroidNotification;
  fcm_options: AndroidFcmOptions;
  direct_boot_ok: boolean;
};

type LightSettings = {
  color: Color;
  light_on_duration: string;
  light_off_duration: string;
};

type AndroidFcmOptions = {
  analytics_label: string;
};
type FcmOptions = {
  analytics_label: string;
};
type WebpushFcmOptions = {
  link: string;
  analytics_label: string;
};

type WebpushConfig = {
  headers: Headers;
  data: Data;
  notification: Notification;
  fcm_options: WebpushFcmOptions;
};

type Aps = {
  alert?: string;
  badge: number;
  sound: string;
  content_available: boolean;
  category?: string;
  thread_id?: string;
};

type ApnsFcmOptions = {
  analytics_label: string;
  image: string;
};

type ApnsPayload = {
  aps: Aps;
  fcm_options?: ApnsFcmOptions;
};

type ApnsConfig = {
  headers: Headers;
  payload: ApnsPayload;
};

enum AndroidMessagePriority {
  NORMAL = "NORMAL",
  HIGH = "HIGH",
}

enum NotificationPriority {
  PRIORITY_UNSPECIFIED = "PRIORITY_UNSPECIFIED", //	If priority is unspecified, notification priority is set to PRIORITY_DEFAULT.
  PRIORITY_MIN = "PRIORITY_MIN", //Lowest notification priority. Notifications with this PRIORITY_MIN might not be shown to the user except under special circumstances, such as detailed notification logs.
  PRIORITY_LOW = "PRIORITY_LOW", //Lower notification priority. The UI may choose to show the notifications smaller, or at a different position in the list, compared with notifications with PRIORITY_DEFAULT.
  PRIORITY_DEFAULT = "PRIORITY_DEFAULT", //Default notification priority. If the application does not prioritize its own notifications, use this value for all notifications.
  PRIORITY_HIGH = "PRIORITY_HIGH", //Higher notification priority. Use this for more important notifications or alerts. The UI may choose to show these notifications larger, or at a different position in the notification lists, compared with notifications with PRIORITY_DEFAULT.
  PRIORITY_MAX = "PRIORITY_MAX",
}

enum Visibility {
  VISIBILITY_UNSPECIFIED = "VISIBILITY_UNSPECIFIED", //	Unspecified. Use with caution.
  PRIVATE = "PRIVATE", //	Show this notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
  PUBLIC = "PUBLIC", //	Show this notification in its entirety on all lockscreens.
  SECRET = "SECRET", //	Do not reveal any part of this notification on a secure lockscreen.
}

export type Message = {
  name?: string;
  data?: Data;
  topic?: string;
  condition?: string;
  notification: Notification;
  android?: AndroidConfig;
  apns?: ApnsConfig;
  webpush?: WebpushConfig;
  fcm_options?: FcmOptions;
};

export type ErrorType =
  | "UNSPECIFIED_ERROR"
  | "INVALID_ARGUMENT"
  | "UNREGISTERED"
  | "SENDER_ID_MISMATCH"
  | "QUOTA_EXCEEDED"
  | "UNAVAILABLE"
  | "INTERNAL"
  | "THIRD_PARTY_AUTH_ERROR";
