import { existsSync, readFileSync } from "fs";
import axios from "axios";
import { GoogleAuth } from "google-auth-library";
import { type Message } from "./types";
import { handleAxiosError } from "./errors";

export class FCM {
  private auth: GoogleAuth;
  protected client: Awaited<ReturnType<GoogleAuth["getClient"]>> | null = null;
  private url: string;

  constructor(path_to_creds: string) {
    if (!existsSync(path_to_creds)) {
      throw new Error("Enter a valid path to your private key file");
    }
    const creds = JSON.parse(readFileSync(path_to_creds, "utf8"));
    if (!creds.project_id)
      throw new Error("No project_id found in  private key file");
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
    this.client = await this.auth.getClient();
    const { token } = await this.client.getAccessToken();
    return token;
  }

  async send(
    registrationToken: string,
    message: Message
  ): Promise<{ name: string }> {
    try {
      const token = await this.getAccessToken();
      const response = await axios(this.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          message: {
            token: registrationToken,
            ...message,
          },
        },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }

  async sendAll(registrationTokens: string[], message: Message) {
    try {
      const promises = registrationTokens.map((registrationToken) => {
        return this.send(registrationToken, message);
      });
      const response = await Promise.all(promises);
      return response;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async sendToTopic(topic: string, message: Message) {
    try {
      const token = await this.getAccessToken();
      const response = await axios(this.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          message: {
            topic,
            ...message,
          },
        },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
}
