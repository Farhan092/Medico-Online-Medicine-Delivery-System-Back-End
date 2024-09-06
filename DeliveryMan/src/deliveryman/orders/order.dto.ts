import { Optional } from "@nestjs/common";
import { IsString, IsInt, IsEmail, MinLength, Matches, IsNotEmpty, MaxLength,IsOptional } from "class-validator";

export class OrderStatusDTO {
  orderStatus: string;
}
