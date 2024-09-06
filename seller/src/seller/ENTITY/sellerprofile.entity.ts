

import { Entity,Unique, PrimaryGeneratedColumn,ManyToOne,JoinColumn, Column,OneToMany,OneToOne} from 'typeorm';
import { SellerEntity } from './seller.entity';





@Entity("Seller Profile")
export class SellerProfileEntity {
  @PrimaryGeneratedColumn()
  profile_id: number;
  
  @Column()
  FirstName: string;
  
  @Column()
  LastName: string;

  @Column()
  HouseNumber: string;

  @Column()
  street: string;
  
  @Column()
  city: string;

  @Column()
  division: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => SellerEntity, seller => seller.sellerProfile)
  @JoinColumn()
  seller: SellerEntity;
}