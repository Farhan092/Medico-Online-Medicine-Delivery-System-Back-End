import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class customerDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3, 8)
  password: string;

  @IsNotEmpty()
  address: string;

  complains: string;

  order: string;
}
