import { IsString, IsNumber, IsOptional, isString } from 'class-validator';
import { Decimal128 } from 'typeorm';
import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty,  } from "class-validator";

import { Matches, MaxLength, MinLength } from "class-validator";



export class ProductDTO{

  @Optional()
  productId: number;

  @IsNotEmpty({ message: 'Please enter a valid product name' })
  @IsString()
  @Matches(/^[^\d]+$/, { message: 'Product ame should not contain any numbers' })
  @Matches(/^[A-Za-z]+$/, { message: 'Product name should only contain alphabetic character' })
  productName: string;

  @IsNotEmpty()
  @IsString()
  productDescription: string;


  @IsNotEmpty()
  @IsString()
  productManufacturer : string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Quantity field must contain only digits' })
  productQuantity: string;


  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Price field must contain only digits' })
  productPrice: string;

  
  @Optional()
  filename: string;

  @Optional()
  categories : any;



  

}


export class UpdateDTO{

  @IsNotEmpty({ message: 'Please enter a valid product name' })
  @IsString()
  @Matches(/^[^\d]+$/, { message: 'Product ame should not contain any numbers' })
  @Matches(/^[A-Za-z]+$/, { message: 'Product name should only contain alphabetic character' })
  productName: string;

  @IsNotEmpty()
  @IsString()
  productDescription: string;


  @IsNotEmpty()
  @IsString()
  productManufacturer : string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Quantity field must contain only digits' })
  productQuantity: string;



  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Price field must contain only digits' })
  productPrice: string;

  
  @Optional()
  filename: string;

}