import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  cartId: number;

  @Column()
  name: string;

  @Column()
  price:number;

  @Column()
  quantity: number;

  @Column()
  productId:number;

  @OneToOne(() => CustomerEntity, customer => customer.cart)
  //@JoinColumn()
  customer: CustomerEntity;
  
}