// import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

// @Entity("admin")
// export class AdminEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ unique: true, length: 100 })
//     username: string;

//     @Column({ length: 150, nullable: true })
//     fullName: string;

//     @Column({ default: false })
//     isActive: boolean;

//     @BeforeInsert()
//     generateId() {
//       this.id = Math.floor(Math.random()*10000);
//     }
// }



// admin.entity.ts
import { Entity, PrimaryGeneratedColumn, Column,Unique,OneToOne,JoinColumn, OneToMany } from 'typeorm';
import { sellerEntity } from 'src/Seller/seller.entity';
import { Optional } from '@nestjs/common';
import { AdminProfileEntity } from './adminProfile.Entity';
import { AdminProfileDTO } from './admin.dto';

@Entity()
// @Unique(['email'])
export class AdminEntity {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column()
   userName: string;
  // @Column({ type: 'varchar', length: 100, unique: true })
  //   email: string;
  
  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @Column()
  profilePicture: string; 

  @OneToMany(() => sellerEntity, (seller) => seller.admin)
  seller: sellerEntity[]
  // @OneToMany(() => sellerEntity, manager => manager.admin, { cascade: true })
  // seller: sellerEntity[];
  @OneToOne(() => AdminProfileEntity, (adminProfile )=> adminProfile.admin)
  @JoinColumn()
  adminProfile: AdminProfileEntity;
 
  
}
