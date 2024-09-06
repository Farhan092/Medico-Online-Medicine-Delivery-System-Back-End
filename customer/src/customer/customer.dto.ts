import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty, IsNumberString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CustomerDTO{
   
    @Optional()
    customerId: string;
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    @IsString()
    @Matches(/[!@#$&]/, { message: 'Password must contain one of @, #, $, or &' })
    password: string;
    @IsNumberString({}, { message: 'Invalid phone number format' })
    @MaxLength(11)
    @MinLength(11)
    phone: string;
    @IsString()
    @Matches(/^[^\d]+$/, { message: 'Name must not contain numbers' })
    name: string;
    @IsNotEmpty()
    address: string;

    filename: string;
    
    @Optional()
    cart: any;
    @Optional()
    orders: any;
}
export class loginDTO{
    @IsEmail() email: string;
    @IsNotEmpty() password: string;    
} 

export class updatePictureDTO{
    filename: string;   
} 