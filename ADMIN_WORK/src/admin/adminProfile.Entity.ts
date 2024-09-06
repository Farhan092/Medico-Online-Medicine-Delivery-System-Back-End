// import { Entity, PrimaryGeneratedColumn, Column, OneToOne, 
//     JoinColumn } from 'typeorm';
//   import { AdminEntity } from './admin.entity';

// @Entity("AdminProfile")
//     export class AdminProfile {
//     @PrimaryGeneratedColumn()
//     id: number;
//     @Column()
//     age: number;
//     @Column()
//     phone: number;
  
//     // @OneToOne(() => AdminEntity, adminEntity => adminEntity.AdminProfile)
//     // @JoinColumn() // Specify the join column here
//     // AdminEntity: AdminEntity;
   

//     }
// admin-profile.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
// import { AdminEntity } from './admin.entity'; 

// @Entity()
// export class AdminProfileEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   phone: string;

//   @Column()
//   address: string;

//   @Column()
//   age: number;
//   @Column()
//   userId:string;


// @OneToOne(() => AdminEntity, user => user.userProfile)
// user: AdminEntity;
// }
// admin-profile.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { AdminEntity } from './admin.entity'; 
import { AdminProfileDTO } from './admin.dto';

@Entity()
export class AdminProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  age: number;

//   @Column()
//   userId: string; // This column will hold the foreign key to AdminEntity's userId

  @OneToOne(() => AdminEntity, (admin) => admin.adminProfile) // Specify the relationship with AdminEntity
  @JoinColumn() // Specify the name of the column used as the foreign key
  admin: AdminEntity;
}

