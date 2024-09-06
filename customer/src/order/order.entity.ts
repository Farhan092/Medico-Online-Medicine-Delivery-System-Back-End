import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm';
import { CustomerEntity } from 'src/customer/customer.entity';

@Entity('order')
export class OrderEntity {

    @PrimaryGeneratedColumn()
    orderId: number;
    // @UpdateDateColumn()
    // orderdate: string;
    @Column()
    orderNumber: string;
    
    @ManyToOne(() => CustomerEntity, customer => customer.orders)
    customer: CustomerEntity;
}