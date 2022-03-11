import { IsAlphanumeric,  IsDateString, IsDefined, IsEmail, IsNumber, IsNumberString, IsPositive } from "class-validator"

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


export class CreateEmployeeDTO {
    @IsDefined()
    name: string;
    @IsDefined()
    surname: string;
    @IsDefined()
    @IsNumber()
    age: number;
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
    @IsDefined()
    qualification: string;
    @IsDefined()
    company_id: number;
}

export class CreateProjectDTO {
    @IsDefined()
    name: string;
    @IsDefined()
    category: string;
    @IsDefined()
    @IsPositive()
    expenses: number;
    @IsDefined()
    @IsPositive()
    incomes: number;
    @IsDefined()
    @IsDateString()
    start_at: Date;
    @IsDefined()
    @IsDateString()
    updated_at: Date;
    @IsDefined()
    @IsDateString()
    end_at: Date;
    @IsDefined()
    company_id: number;
}


export class CreateTaskDTO {
    @IsDefined()
    title: string;
    @IsDefined()
    category: string;
    @IsDefined()
    description: string;
    @IsDefined()
    @IsDateString()
    start_at: Date;
    @IsDefined()
    @IsDateString()
    updated_at: Date;
    @IsDefined()
    @IsDateString()
    end_at: Date;
    @IsDefined()
    project_id: number;
}