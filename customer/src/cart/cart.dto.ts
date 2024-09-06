import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";





export class CartDTO{

    @Optional()
    cartId: number;

    name: string;

    price: number;

    quantity: number;

    //@Optional()
    productId: number;

    @Optional()
    customer: any;

}   