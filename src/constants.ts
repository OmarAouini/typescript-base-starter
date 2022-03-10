export enum Errors {

}

export enum Roles {
  ADMIN="admin",
  USER="user"
}

export const HOST = process.env.HOST || "0.0.0.0"
export const PORT = process.env.PORT || 8080
export const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL || ""
export const KEYLOAK_REALM = "compress"
export const JWT_SECRET = process.env.JWT_SECRET || ""