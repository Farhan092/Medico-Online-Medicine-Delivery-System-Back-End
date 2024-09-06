import { AdminEntity } from 'src/admin/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("seller")
export class sellerEntity{
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
  @ManyToOne(() => AdminEntity, (admin) => admin.seller)
  admin: AdminEntity

}