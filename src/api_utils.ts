

export class ApiResponse {
    message: string
    data: any
    constructor(msg:string, data: any) {
        this.message = msg
        this.data = data
    }
}