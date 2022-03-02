export class ApiResponse<T> {
    message: string
    data: T
    constructor(msg:string, data: T) {
        this.message = msg
        this.data = data
    }
}
