import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from
'typeorm';
import { ProductEntity } from './product.entity';


@Entity('Category')
export class CategoryEntity {
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@ManyToMany(() => ProductEntity, product => product.categories)
products: ProductEntity[];
}
