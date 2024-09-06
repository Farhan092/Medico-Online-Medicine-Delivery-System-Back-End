// import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

// export class UserDto {
//   @IsNotEmpty({ message: 'Name is required' })
//   @MinLength(4, { message: 'Name should be at least 4 characters' })
//   name: string;

//   @IsEmail({}, { message: 'Email address is invalid' })
//   @Matches(/.*@aiub\.edu$/, {
//     message: 'Email address must belong to aiub.edu domain',
//   })
//   email: string;

//   @IsNotEmpty({ message: 'Password is required' })
//   @MinLength(6, { message: 'Password should be at least 6 characters' })
//   @Matches(/.*[A-Z].*/, {
//     message: 'Password must contain at least one uppercase character',
//   })
//   password: string;

//   @IsNotEmpty({ message: 'Gender is required' })
//   @Matches(/^(male|female)$/i, { message: 'Gender should be male or female' })
//   gender: string;

//   @IsNotEmpty({ message: 'Profile picture is required' })
//   @Matches(/.*\.jpg$/, { message: 'Profile picture must have JPG extension' })
//   profilePicture: string;

//   @IsNotEmpty({ message: 'Phone number is required' })
//   @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
//   phoneNumber: string;
// }
// // // user.dto.ts

// // // user.dto.ts

// // import { IsString, MinLength, IsEmail, Matches,IsIn,IsOptional,IsNumberString } from 'class-validator';

// // export class UserDto {
// //   @IsString()
// //   @MinLength(4, { message: 'Name should be at least 4 characters' })
// //   name: string;

// //   @IsEmail({}, { message: 'Invalid email address' })
// //   @Matches(/^[a-zA-Z0-9._%+-]+@aiub.edu$/, {
// //     message: 'Email address must contain aiub.edu domain'
// //   })
// //   email: string;
// //   @IsString()
// //   @MinLength(6, { message: 'Password should be at least 6 characters' })
// //   @Matches(/^(?=.*[A-Z])/,
// //     { message: 'Password must contain at least one uppercase character' })
// //   password: string;
// //   @IsIn(['male', 'female'], { message: 'Gender must be either "male" or "female"' })
// //   gender: string;

// //   @IsOptional()
// //   @Matches(/\.(jpg)$/, {
// //     message: 'Profile picture must be in JPG format'
// //   })
// //   profilePicture?: string;
// //   @IsNumberString({}, { message: 'Phone number must contain only numbers' })
// //   phoneNumber: string;
// // }
// export class CreateUserDto {
//     username: string;
//     fullName?: string;
// }



// admin.dto.ts
// admin.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength,Matches,IsInt,Min } from 'class-validator';
import { Type } from 'class-transformer'; // Import Type decorator
import { Express } from 'express';
import { Optional } from "@nestjs/common";
import { sellerEntity } from 'src/Seller/seller.entity';
import { sellerDTO } from 'src/Seller/seller.dto';
import { AdminProfileEntity } from './adminProfile.Entity';

export class AdminDTO {
    
  @IsNotEmpty()
  @IsString()
   userName: string;

 @IsNotEmpty()
 @IsEmail()
   email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
 password: string;

 
  profilePicture: string; 

@Optional()
seller: any;
@Optional()
    userId: string;
   
    @Optional()
    adminProfile:any;
}
export class loginDTO{
  @IsEmail() email: string;
  @IsNotEmpty() password: string;    
}

export class AdminProfileDTO {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsInt()
  age: number;
  // @Optional()
  //   userId: string;
 
}
