import { Entity, PrimaryGeneratedColumn, Column,Unique,OneToOne,JoinColumn, OneToMany } from 'typeorm';
import { sellerEntity } from 'src/Seller/seller.entity';
import { Optional } from '@nestjs/common';
import { AdminProfileEntity } from './adminProfile.Entity';
import { AdminProfileDTO } from './admin.dto';

@Entity()
// @Unique(['email'])
export class medicineEntity {
  @PrimaryGeneratedColumn()
  medicineId: string;

  @Column({unique:true})
   medicineName: string;
  // @Column({ type: 'varchar', length: 100, unique: true })
  //   email: string;
  
  @Column() // Define the prize column
  prize: number;
  @Column()
  profilePicture: string; // Assuming this field stores the filename
}