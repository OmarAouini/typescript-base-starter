
export class JwtProvider {
    private secret: string
    private expireTime: Date

    constructor() {
        this.secret = process.env.JWT_SECRET || ""
        this.expireTime = new Date() // add duration
    }
}