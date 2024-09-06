import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, ManyToOne } from 'typeorm';
import { DeliverymanEntity } from '../deliveryman.entity';


@Entity("orders") 
export class SeeorderEntity{
  @PrimaryGeneratedColumn() 
  OrderId: string;
  @Column()
  name: string;
  @Column({unique:true})
  email: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  orderItem: string;
  @Column({nullable:true})
  orderStatus: string;

  @ManyToOne(() => DeliverymanEntity, deliveryman => deliveryman.orders)
  deliveryman: DeliverymanEntity;
}