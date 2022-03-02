export enum Errors {

}

export enum Roles {
  REDATTORE="redattore",
  CAMERAMAN="cameraman"
}

const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 8080
const KEYCLOAK_PUBLIC_KEY = () => {
  let res = request('GET', 'http://localhost:8080/auth/realms/appsdeveloperblog');
  let response = JSON.parse(res.getBody().toString());
  let publicKey = `-----BEGIN PUBLIC KEY-----\r\n${response.public_key}\r\n-----END PUBLIC KEY-----`;
  return publicKey;
}
