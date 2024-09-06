import { AdminEntity } from 'src/admin/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("customer")
export class customerEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;
  @Column()
  complains:string;
  @Column()
  order:string;

}