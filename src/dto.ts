import { IsAlphanumeric, IsDefined, IsEmail, IsNumberString } from "class-validator"

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

export class CreateCompanyDTO {
    @IsDefined()
    name: string
    @IsDefined()
    @IsEmail()
    email: string;
    @IsDefined()
    address: string;
    @IsDefined()
    @IsNumberString()
    phone_number: string;
    @IsDefined()
    @IsAlphanumeric()
    vat_code: string;
}
