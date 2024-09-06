import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, OneToMany } from 'typeorm';
import { SeeorderEntity } from './orders/order.entity';

@Entity("deliveryman")
export class DeliverymanEntity {
  
  @PrimaryGeneratedColumn() 
  deliverymanId: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({unique:true})
  email: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column()
  address: string; 
  @Column()
  filename: string;

  
  @OneToMany(() => SeeorderEntity, order => order.deliveryman, { cascade: true })
  orders: SeeorderEntity[]; 
  
  }

  
