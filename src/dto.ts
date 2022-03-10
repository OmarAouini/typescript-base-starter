import { IsDefined, IsEmail } from "class-validator"

export class CreateUserDTO {
    @IsDefined()
    @IsEmail()
    email: string
    @IsDefined()
    name: string
}


export class CreateProfileDTO {
    @IsDefined()
    "bio": string
}