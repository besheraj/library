import axios, { AxiosResponse } from "axios";
import qs from "qs";

interface ICredentials {
  client_id: string;
  client_secret: string;
}

interface ITokenRes {
  access_token: string;
  token_type: "Bearer";
  expires_in: string;
  scope: "anonymous";
}

interface IData {}

export class CDKDriveCustomer {
  private client_id: string;
  private client_secret: string;
  private token?: ITokenRes;

  constructor(cred: ICredentials) {
    this.client_id = cred.client_id;
    this.client_secret = cred.client_secret;
  }

  async init() {
    try {
      const data = `${this.client_id}:${this.client_secret}`;
      const encodedCred = Buffer.from(data, "ascii").toString("base64");
      const reponse = await axios.post<IData, AxiosResponse<ITokenRes>>(
        `https://identity.fortellis.io/oauth2/${encodedCred}/v1/token`,
        qs.stringify({
          grant_type: "client_credentials",
          scope: "anonymous",
        })
      );

      this.token = reponse.data;
      return this.token;
    } catch (err: any) {
      return err;
    }
  }
}
