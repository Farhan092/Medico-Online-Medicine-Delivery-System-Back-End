import { IsString, IsNumber, IsOptional, isString } from 'class-validator';
import { Decimal128 } from 'typeorm';
import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty,  } from "class-validator";

import { Matches, MaxLength, MinLength } from "class-validator";

export class SellerDTO{

  @Optional()
  sellerId: string;
   
  @IsNotEmpty({ message: 'Please enter a valid email address' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(20, { message: 'Email Address can not exceed 20 characters' })
  @MinLength(10, { message: 'Email Address must be at least 10 characters long' })
  @Matches(/.*@.*\.com$/, { message: 'Email must contain @, ., com' })
  email: string;

  @IsNotEmpty({ message: 'Please enter a valid password' })
  @IsString()
  @Matches(/.*[0-9].*/, { message: 'Password field must contain one of the numeric character' })
  password: string;

  @IsNotEmpty({ message: 'Please enter a valid name' })
  @IsString()
  @Matches(/^[^\d]+$/, { message: 'Name should not contain any numbers' })
  @Matches(/^[A-Za-z]+$/, { message: 'Name should only contain alphabetic character' })
  name: string;


  @IsNotEmpty({ message: 'Enter your address please.' })
  @IsString()
  address: string;

  @Optional()
  filename: string;

  @Optional()
  sellerProfile : any;

}


export class loginDTO{
  @IsEmail() email: string;
  @IsNotEmpty() password: string;    
}







