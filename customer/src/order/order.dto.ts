import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";





export class OrderDTO{

    @Optional()
    orderId: string;
    orderNumber:string;
    

    @Optional()
    customer: any;

}   