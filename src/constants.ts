export enum Errors {

}

export enum Roles {
  REDATTORE="redattore",
  CAMERAMAN="cameraman"
}

const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 8080
const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL || ""
const KEYLOAK_REALM = "compress"
const KEYCLOAK_PUBLIC_KEY = () => {
  let res = request('GET', `${KEYCLOAK_BASE_URL}/auth/realms/${KEYLOAK_REALM}`);
  let response = JSON.parse(res.getBody().toString());
  let publicKey = `-----BEGIN PUBLIC KEY-----\r\n${response.public_key}\r\n-----END PUBLIC KEY-----`;
  return publicKey;
}
