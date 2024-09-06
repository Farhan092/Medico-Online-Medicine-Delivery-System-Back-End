import { Entity,ManyToMany,JoinTable,Unique, PrimaryGeneratedColumn,ManyToOne,JoinColumn, Column,OneToMany,OneToOne} from 'typeorm';
import { SellerProfileEntity } from './sellerprofile.entity';
import { CategoryEntity } from './category.entity';


@Entity("product")
export class ProductEntity{

    @PrimaryGeneratedColumn()
    productId: number;

    @Column({name:'productName', type: 'varchar', length: 200 })
    productName: string;

    @Column({name:'productDescription', type: 'varchar', length: 200})
    productDescription: string;

    @Column({name:'productManufacturer', type: 'varchar', length: 200})
    productManufacturer: string;

    @Column()
    productQuantity: string;

    // @Column({ type: 'varchar', length: 50 })
    // productCategory: string;

    @Column()
    productPrice: string;

    @Column({name:'image' })
    filename: string;

    @ManyToMany(() => CategoryEntity, category => category.products)
    @JoinTable()
    categories: CategoryEntity[];

    
}