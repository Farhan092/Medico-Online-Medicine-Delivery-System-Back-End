import { Injectable } from "@nestjs/common";
import { CustomerDTO,loginDTO, updatePictureDTO } from "./customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProductEntity } from "src/product/product.entity";
import { CartEntity } from "src/cart/cart.entity";
import { CartDTO } from "src/cart/cart.dto";
import { OrderDTO } from "src/order/order.dto";
import { OrderEntity } from "src/order/order.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";



@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepo: Repository<CustomerEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepo: Repository<ProductEntity>,
        @InjectRepository(CartEntity)
        private readonly cartRepo: Repository<CartEntity>,
        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<OrderEntity>,
        //private jwtService:JwtService,
        private mailerService:MailerService
    ) {}

    getUserswithauth(): object {
        return { message: "hello Customer" }
    }

    getUsers(email:string) {
        return `welcome Customer '${email}'`;
    }

    async login(customerdata:CustomerDTO)
    {
        const customer = 
        await this.customerRepo.findOneBy({email:customerdata.email});
        const result = 
        await bcrypt.compare(customerdata.password, customer.password);
        if(result)
        {
            return true;
        }
        else{
            return false;
        }
    }

    async getprofile(email:string):Promise<CustomerEntity> {
        return this.customerRepo.findOneBy({email:email})
    }

    async updateprofile(email:string, customerdata:CustomerDTO):Promise<CustomerEntity>
    {
        await this.customerRepo.update({email:email},customerdata);
        return await this.customerRepo.findOneBy({email:email});
    }

    async viewProfilePic(email:string)
    {
        //return await this.customerRepo.find({select: { filename: true}, where: [{email:email}]})
        return await this.customerRepo.findOneBy({email:email});
    }

    async updateProfilePicture(myobj: updatePictureDTO,email:string)
    {
        let customer=await this.customerRepo.findOneBy({email})
        if(customer)
        {
            customer.filename=myobj.filename;
            return await this.customerRepo.save(customer);
        }
        
    }

    async deleteprofile(email:string) {
        let res = await this.customerRepo.delete({email:email});
        if(res)
        {
            return "profile deleted successfully";
        }
    }

    async getallproduct(): Promise<ProductEntity[]> {
        return this.productRepo.find();
    }

    async getProductByName(name: string): Promise<ProductEntity> {
        return await this.productRepo.findOne({ where: { name } });
    }

    async addToCart(email:string, cart:CartDTO): Promise<CartEntity> {
        
        let product= await this.productRepo.findOneBy({productId:cart.productId});
        if(product)
        {
            //let findcustomer=await this.customerRepo.findOneBy({email:email});
            let customer = await this.customerRepo.findOneBy({ email: email });
            if(customer)
            {
                //cart.customer=customer;
                // let customer=await this.customerRepo.find({select: { customerId: true}, where: [{email:email}]})
                // cart.customer=customer;
                // res.quantity = res.quantity - cart.quantity;
                // await this.productRepo.update(cart.productId,res);
                // cart.price = cart.price * cart.price;
                // return await this.cartRepo.save(cart);
                product.quantity -= cart.quantity;
                //await this.productRepo.save(product);
                await this.productRepo.update(cart.productId,product);
                //await this.productRepo.save(product);
                cart.price = product.price * cart.quantity;
                cart.customer = customer;
                return await this.cartRepo.save(cart);
            }
            // res.quantity = res.quantity - cart.quantity;
            // this.productRepo.update(cart.productId,res);
            // cart.price = cart.price * cart.price;
            // return await this.cartRepo.save(cart);
        }
    }

    // async getCart(email:string):Promise<CustomerEntity> {
    //     let customer= await this.customerRepo.findOneBy({email:email});
    //     if(customer)
    //     {
    //         await this.customerRepo.findOne({ where: { email: email }, relations: ['cart'] });
    //         return await this.cartRepo.findOneBy({cartId:customer.cart.cartId});
    //         //return data;
    //         // if(cart)
    //         // {
    //         //     //await this.customerRepo.findOne({cart:customer.cart.cartId});
    //         //     await this.cartRepo.findOne({cartId:customer.cart.cartId});
    //         // }
    //     }
    // }

    async getCart(email: string): Promise<CartEntity> {
        let customer = await this.customerRepo.findOne({ where: { email: email }, relations: ['cart'] });
        if (customer && customer.cart) {
            return customer.cart; 
        }
        throw new Error('Cart is empty');
    }

    async createOrder(email: string, order: OrderDTO): Promise<OrderEntity> {
        let customer = await this.customerRepo.findOneBy({email:email});
        //order.customer = data;
        const data = new OrderEntity();
        data.orderNumber = order.orderNumber;
        data.customer = customer;
        return await this.orderRepo.save(data);
    }

    async getOrder(email: string): Promise<OrderEntity[]> {
        //let customer = await this.customerRepo.findOneBy({email:email});
        return this.orderRepo.find({ where: { customer: { email: email } } });
        //let order = await this.orderRepo.findOne({ where: { customer.: email }, relations: ['cart'] });

    }
    

    async addCustomer(myobj: CustomerEntity): Promise<CustomerEntity>
    {
        return await this.customerRepo.save(myobj);
    }


    async findOne( logindata:loginDTO): Promise<any> {
        return await this.customerRepo.findOneBy({email:logindata.email});
    }


    // async getAllCustomers(): Promise<CustomerEntity[]> {
    //     return await this.customerRepo.find({ relations: ['orders'] });
    //     }
        
    sendMail() : void {
        this.mailerService.sendMail({
          to: 'claude.mta@gmail.com',
          from: 'claude.mta@gmail.com',
          subject: 'Testing mailer',
          text: 'welcome',
          html: '<b>Your OTP is 21212</b>',
        })
      }
}