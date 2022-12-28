import axios from "axios";
import { GoogleAuth } from "google-auth-library";
import { type FCMPayload } from "../types";
import fs from "node:fs";

export class FCM {
  private auth: GoogleAuth;
  protected client: Awaited<ReturnType<GoogleAuth["getClient"]>> | null = null;
  private url: string;

  constructor(path_to_creds: string) {
    const creds = JSON.parse(fs.readFileSync(path_to_creds, "utf8"));
    if (!creds.project_id) throw new Error("No project_id found in creds.json");

    this.auth = new GoogleAuth({
      keyFile: path_to_creds,
      clientOptions: {
        forceRefreshOnFailure: true,
      },
      scopes: [
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/firebase.messaging",
      ],
    });
    this.url = `https://fcm.googleapis.com/v1/projects/${creds.project_id}/messages:send`;
  }

  async getAccessToken() {
    console.log("Access Token");
    this.client = await this.auth.getClient();
    const { token } = await this.client.getAccessToken();

    return token;
  }

  async send(payload: FCMPayload) {
    const token = await this.getAccessToken();
    const response = await axios(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
    return response.data;
  }
}
