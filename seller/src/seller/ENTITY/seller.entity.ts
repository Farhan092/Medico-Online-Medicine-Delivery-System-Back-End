
import { Entity,ManyToMany,JoinTable,Unique, PrimaryGeneratedColumn,ManyToOne,JoinColumn, Column,OneToMany,OneToOne} from 'typeorm';
import { SellerProfileEntity } from './sellerprofile.entity';
import { CategoryEntity } from './category.entity';




@Entity("seller")
@Unique(['email'])
export class SellerEntity{

    @PrimaryGeneratedColumn() 
    sellerId: string;
  
    @Column()
    email: string;
    @Column({ type: 'varchar'})
    password: string;
    @Column({type: 'varchar', length: 150 })
    name: string;
    @Column()
    address: string;
    @Column()
    filename: string;
    
    @OneToOne(() => SellerProfileEntity, sellerProfile => sellerProfile.seller, { cascade: false
    })
    
    sellerProfile: SellerProfileEntity;
}

