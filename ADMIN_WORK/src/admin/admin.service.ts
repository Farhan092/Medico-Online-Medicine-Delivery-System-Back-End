// // import { Injectable } from '@nestjs/common';
// // import { UserDto } from './user.dto';

// // @Injectable()
// // export class AdminService {
// //   async registerAdmin(adminData: UserDto): Promise<object> {
    
// //     return { message: 'Admin registered successfully', adminData };
// //   }
// //   async loginAdmin(username: UserDto, password: UserDto): Promise<object> {
    
// //     return { message: 'Admin logged in successfully', username, password };
// //   }
// //   async upgradePassword(newPassword: UserDto): Promise<object> {
    
// //     return { message: 'Password upgraded successfully', newPassword };
// //   }
// //   async updateAdminProfile(username: UserDto, email: UserDto, password: UserDto): Promise<object> {
    
// //     return { message: 'Admin profile updated successfully', username, email, password };
// //   }
// //   async deleteAdmin(username: UserDto): Promise<object> {
    
// //     return { message: 'Admin deleted successfully', username };
// //   }
// // }
// // admin.services.ts

// import { Injectable } from '@nestjs/common';
// import { UserDto } from './admin.dto';

// @Injectable()
// export class AdminService {
//   createUser(userDto: UserDto): void {
//     //console.log('User created:', userDto.name);
//   }
// }
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository,Like} from 'typeorm';
// import { AdminEntity } from './admin.entity';
// import { CreateUserDto } from './admin.dto';

// @Injectable()
// export class AdminService {
//     constructor(
//         @InjectRepository(AdminEntity)
//         private adminRepository: Repository<AdminEntity>,
//     ) {}

//     async createUser(createUserDto: CreateUserDto): Promise<AdminEntity> {
//         const user = this.adminRepository.create(createUserDto);
//         return this.adminRepository.save(user);
//     }

//     async getUsersWithNullFullName(): Promise<AdminEntity[]> {
//         return this.adminRepository.find({ where: { fullName: null } });
//     }

//     async getUserByUsername(username: string): Promise<AdminEntity> {
//         const user = await this.adminRepository.findOne({ where: { username } });
//         if (!user) {
//             throw new NotFoundException('User not found');
//         }
//         return user;
//     }

//     async getUsersWithFullNameSubstring(substring: string): Promise<AdminEntity[]> {
//         return this.adminRepository.find({ where: { fullName: Like(`%${substring}%`) } });
//     }

//     async removeUserByUsername(username: string): Promise<void> {
//         const result = await this.adminRepository.delete({ username });
//         if (result.affected === 0) {
//             throw new NotFoundException('User not found');
//         }
//     }
// }




// admin.service.ts
import { Injectable,UnauthorizedException,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { AdminDTO ,AdminProfileDTO,loginDTO} from './admin.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sellerDTO } from 'src/Seller/seller.dto';
import { sellerEntity } from 'src/Seller/seller.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './admin.guard';
import { AdminProfileEntity } from './adminProfile.Entity';
import { medicineEntity } from './medicine.entity';
import { medicineDTO } from './medicine.dto';
import { customerEntity } from 'src/customer/customer.entity';
import { customerDTO } from 'src/customer/customer.dto';
import { MailerService } from "@nestjs-modules/mailer/dist";




@Injectable()
export class AdminService {
  constructor(
    
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    @InjectRepository(sellerEntity)
    private sellerRepo: Repository<sellerEntity>,
     private jwtService: JwtService,
     @InjectRepository(AdminProfileEntity)
     private readonly adminProfileRepository: Repository<AdminProfileEntity>,
     @InjectRepository(AdminEntity)
     private readonly adminRepository: Repository<AdminEntity>,
     @InjectRepository(medicineEntity)
    private readonly medicineRepo: Repository<medicineEntity>,
    @InjectRepository(customerEntity)
    private customerRepo: Repository<customerEntity>,
    private readonly mailerService: MailerService
    
  ) {}
  

  async addAdmin(myobj: AdminEntity): Promise<AdminEntity> {
    return await this.adminRepo.save(myobj);
}



async getAdminByID(id) {
  const data=await this.adminRepo.findOne({ where: { userId: id } });
  console.log(data);
  if(data!==null) {
      return data;
  }
 else 
 {
  throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
 }

}

async updateAdminById(id: string, adminDTO: AdminDTO): Promise<any> {
  
  if (adminDTO.password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(adminDTO.password, salt);
    adminDTO.password = hashedPassword;
  }

  
  await this.adminRepo.update(id, adminDTO);

  
  return await this.adminRepo.findOne({ where: { userId: id } });
}

// async signin(mydto:AdminDTO):Promise<boolean>{
   
//   if (mydto.email != null && mydto.password != null) {
//       const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
//       const isMatch = await bcrypt.compare(mydto.password, mydata.password);
//       if (isMatch) {
//           return true;
//       }
//       else {
//           return false;
//       }
//   } else {
//       return false;
//   }
 
// }
// insertseller(mydto:sellerDTO):any {
    
//   return this.sellerRepo.save(mydto);
//      }
//      getAdminByManagerID(id):any {
//        return this.sellerRepo.find({ 
//                where: {id:id},
//            relations: {
//                admin: true,
//            },
//         });
//    }
async signIn( logindata:loginDTO): Promise<{ access_token: string }> {
  const user = await this.adminRepo.findOneBy({email:logindata.email});
 if (!user) {
  throw new UnauthorizedException();
 }
  const isMatch = await bcrypt.compare(logindata.password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException();
  }
  const payload = logindata;
  return {
    access_token: await this.jwtService.signAsync(payload),
  };
}




async addManager(adminId: string, manager: sellerEntity): Promise<sellerEntity> {
  console.log(adminId);
  console.log(manager);
  const admin = await this.adminRepo.findOneBy({userId: adminId});
   manager.admin = admin;
  return this.sellerRepo.save(manager);
}

async findAllseller(): Promise<sellerEntity[]> {
  return this.sellerRepo.find();
}

deleteManagerByID(id):any {
    
  return this.sellerRepo.delete(id);
}

// async addProfile(profileDTO: AdminProfileDTO): Promise<AdminProfileEntity> {
//   const newProfile = this.adminProfileRepository.create(profileDTO);
//   return await this.adminProfileRepository.save(newProfile);
// }
async addProfile(userId: string, profileDTO: AdminProfileDTO): Promise<AdminProfileEntity> {
  try {
    
    const adminEntity = await this.adminRepository.findOne({ where: { userId } });
    if (!adminEntity) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    
    const newProfile = this.adminProfileRepository.create(profileDTO);

   
    newProfile.admin = adminEntity;

   
    const createdProfile = await this.adminProfileRepository.save(newProfile);

    return createdProfile;
  } catch (error) {
    throw new HttpException('Failed to add admin profile', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
async addMedicine(medicineDTO: medicineDTO): Promise<medicineDTO> {
  const newMedicine = new medicineEntity();
  newMedicine.medicineName = medicineDTO.medicineName;
  newMedicine.profilePicture = medicineDTO.profilePicture;
  newMedicine.prize = medicineDTO.prize; 
  
  const savedMedicine = await this.medicineRepo.save(newMedicine);

  
  return savedMedicine;
}


async updateMedicineById(id: string, medicineDTO: medicineDTO): Promise<any> {
  await this.medicineRepo.update(id, medicineDTO);
  return await this.medicineRepo.findOne({ where: { medicineId: id } });
}

// async updateMedicineById(id: string, medicineDTO: medicineDTO): Promise<medicineEntity> {
//   const medicine = await this.medicineRepo.findOne({ where: { medicineId: id } });

//   if (!medicine) {
//     throw new NotFoundException('Medicine not found');
//   }

//   // Update medicine properties
//   medicine.medicineName = medicineDTO.medicineName;
//   medicine.profilePicture = medicineDTO.profilePicture;
//   medicine.prize = medicineDTO.prize;
//   // Update other properties as needed

//   // Save updated medicine entity
//   return this.medicineRepo.save(medicine);
// }


async deleteMedicineByID(id: string): Promise<any> {
  return this.medicineRepo.delete(id);
}
async createcustomer(customerDto: customerDTO): Promise<customerEntity> {
  const newCustomerEntity = this.customerRepo.create(customerDto); 
  return this.customerRepo.save(newCustomerEntity);
}
async banCustomerByID(id: string): Promise<any> {
  return this.customerRepo.delete(id);
}
async findAllcustomer(): Promise<customerEntity[]> {
  return this.customerRepo.find();
}

async getCustomerByID(id) {
  const data=await this.customerRepo.findOne({ where: { id: id } });
  console.log(data);
  if(data!==null) {
      return data;
  }
 else 
 {
  throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
 }

}

async findAlladmin(): Promise<AdminEntity[]> {
  return this.adminRepository.find();
}

sendMail() : void {
  this.mailerService.sendMail({
    to: 'sadikulmobasshir22@gmail.com', 
    from: 'shohanmorol123@gmail.com', 
    subject: 'Testing mailer',
    text: 'welcome', 
    html: '<b>Your OTP is 5587</b>', 
  })
}
}







