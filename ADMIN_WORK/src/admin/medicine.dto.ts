import { IsEmail, IsNotEmpty, IsString, MinLength,Matches,IsInt,Min } from 'class-validator';
import { Transform } from 'class-transformer'; // Import Type decorator
import { Express } from 'express';
import { Optional } from "@nestjs/common";
import { sellerEntity } from 'src/Seller/seller.entity';
import { sellerDTO } from 'src/Seller/seller.dto';
import { AdminProfileEntity } from './adminProfile.Entity';

export class medicineDTO {
    
  @IsNotEmpty()
  @IsString()
   medicineName: string;
 // @Type(() => Object) // Use Type decorator to allow transformation
  profilePicture: string; // Remove 'readonly' to allow assignment
  @Transform(({ value }) => parseFloat(value)) // Use ParseFloatPipe to transform the incoming value to a number
  prize: number;
}