//import { ManagerEntity } from "src/manager/manager.entity";
import { CartEntity } from "src/cart/cart.entity";
import { OrderEntity } from "src/order/order.entity";
import {  BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn,Unique,OneToOne, JoinColumn } from "typeorm";


@Entity("customer")
export class CustomerEntity{

    @PrimaryGeneratedColumn() 
    customerId: string;
    @Column({unique:true})
    email: string;
    @Column()
    password: string;
    @Column()
    phone: string;
    @Column()
    name: string;
    @Column()
    address: string;
    
    @Column()
    filename: string;

    // @OneToOne(() => Profile, profile => profile.user)
    // profile: Profile;

    // @OneToMany(() => Order, order => order.user)
    // orders: Order[];

    @OneToOne(() => CartEntity, cart => cart.customer,{cascade:true})
    @JoinColumn()
    cart: CartEntity;

    @OneToMany(() => OrderEntity, order => order.customer, { cascade: true })
    orders: OrderEntity[];
    
}
