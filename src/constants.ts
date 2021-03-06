export enum Errors {

}

export enum Roles {
  ADMIN="admin",
  USER="user"
}

export const API_VERSION = "v1"
export const HOST = process.env.HOST || "0.0.0.0"
export const PORT = process.env.PORT || 8080
export const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL || ""
export const KEYLOAK_REALM = "api_realm"
export const JWT_SECRET = process.env.JWT_SECRET || ""
