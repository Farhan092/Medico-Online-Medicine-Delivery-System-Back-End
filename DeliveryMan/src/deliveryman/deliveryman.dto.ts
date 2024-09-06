import { Optional } from "@nestjs/common";
import { IsString, IsInt, IsEmail, MinLength, Matches, IsNotEmpty, MaxLength,IsOptional, IsNumberString } from "class-validator";

export class DeliverymanDTO {
  @Optional()
  deliverymanId: string;

  @IsString()
  @Matches(/^[^\d]+$/, { message: 'Name must not contain numbers' })
  firstName: string;

  @IsString()
  @Matches(/^[^\d]+$/, { message: 'Name must not contain numbers' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/.*@.*\..*/, { message: 'Email must contain @ and .' })
  email: string;

  @IsString()
  @Matches(/[!@#$&]/, { message: 'Password must contain one of @, #, $, or &' })
  password: string;

  @IsNumberString({}, { message: 'Invalid phone number format' })
  @MaxLength(11)
  @MinLength(11)
  phone: string;
  
  address:string

  filename: string;

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

