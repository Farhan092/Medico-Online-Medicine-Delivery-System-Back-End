import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class sellerDTO {   
   

   @IsNotEmpty()
    name: string;
   
    @IsNotEmpty()
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @Length(3,8)
    password: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    userId:string;
}