export enum Errors {

}

export enum Roles {
  REDATTORE="redattore",
  CAMERAMAN="cameraman"
}

const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 8080
const KEYCLOAK_PUBLIC_KEY = process.env.KEYCLOAK_PUBLIC_KEY || ""
