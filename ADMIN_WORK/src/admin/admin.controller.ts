// // import { Controller, Post,Get,Param, Body,Put,Query,Patch,Delete,UsePipes } from '@nestjs/common';
// // import { AdminService } from './admin.service';
// // import { UserDto } from './user.dto';

// // @Controller('admins')
// // export class AdminController {
// //   constructor(private readonly adminService: AdminService) {}

// //   @Post('register')
// //   async registerAdmin(@Body() adminData: UserDto): Promise<object> {
// //     return this.adminService.registerAdmin(adminData);
// //   }

// //   @Get(':username/:password') 
// //   async loginAdmin(@Param('username') username: UserDto, @Param('password') password: UserDto): Promise<object> {
// //     return this.adminService.loginAdmin(username, password);
// //   }
// //   @Put('password') 
// //   async upgradePassword(@Query('password') newPassword: UserDto): Promise<object> {
// //     return this.adminService.upgradePassword(newPassword);
// //   }

// //   @Patch() 
// //   async updateAdminProfile(
// //     @Query('username') username: UserDto,
// //     @Query('email') email: UserDto,
// //     @Query('password') password: UserDto,
// //   ): Promise<object> {
// //     return this.adminService.updateAdminProfile(username, email, password);
// //   }
// //   @Delete() 
// //   async deleteAdmin(@Query('username') username: UserDto): Promise<object> {
// //     return this.adminService.deleteAdmin(username);
// //   }
// // }
// // admin.controller.ts

// import { Body, Controller, Post } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { UserDto } from './admin.dto';

// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//    @Post('create-user')
//    createUser(@Body() userDto: UserDto): void {
//      this.adminService.createUser(userDto);
//    }
// //   @Post('create-user')
// // async createUser(@Body() userDto: UserDto): Promise<void> {
// //   await this.adminService.createUser(userDto);
// // }

// }
// 



// admin.controller.ts
import { Controller, Post, Body, UseInterceptors, UploadedFile,Put,UsePipes,Session,ValidationPipe,
Param, UseGuards, Delete,    ParseIntPipe, HttpException, HttpStatus,
Get} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDTO,loginDTO } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError } from 'multer';
import { diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { sellerEntity } from 'src/Seller/seller.entity';
import { sellerDTO } from 'src/Seller/seller.dto';
import { AuthGuard } from './admin.guard';
import { AdminProfileEntity } from './adminProfile.Entity';
import { AdminProfileDTO } from './admin.dto';
import { medicineDTO } from './medicine.dto';
import { customerDTO } from 'src/customer/customer.dto';
import { customerEntity } from 'src/customer/customer.entity';
import { AdminEntity } from './admin.entity';



@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('addadmin')
  @UseInterceptors(FileInterceptor('myfile',
      {
          fileFilter: (req, file, cb) => {
              if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                  cb(null, true);
              } else {
                  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
              }
          },
          limits: { fileSize: 5000000 },
          storage: diskStorage({
              destination: './upload',
              filename: function (req, file, cb) {
                  cb(null, Date.now() + file.originalname)
              },
          })
      }
  ))
  async addAdmin(@Body() myobj: AdminDTO, @UploadedFile() file: Express.Multer.File): Promise<AdminDTO> {
    const salt = await bcrypt.genSalt();
      const hashedpassword = await bcrypt.hash(myobj.password, salt); 
      myobj.password= hashedpassword;
      myobj.profilePicture = file.filename; 
      return this.adminService.addAdmin(myobj);
  }
 
 @Get('/findadminProfile/:id')
 
  async getAdminByID(@Param('id', ParseIntPipe) id: number): Promise<AdminDTO> {
    const res = await this.adminService.getAdminByID(id);
        if (res !== null) {
            return await this.adminService.getAdminByID(id);
        }
        else {
            throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
        }
  }
 
  @Put('/updateadmin/:id')
  async updateAdminById(@Param('id') id: string, @Body() adminDTO: AdminDTO): Promise<any> {
    return this.adminService.updateAdminById(id, adminDTO);
  }
  

//   @Post('/signin')
//   @UsePipes(new ValidationPipe())
// async signin(@Session() session, @Body() mydto:AdminDTO)
//   {
//     const res = await (this.adminService.signin(mydto));
// if(res==true)
// {
//   session.email = mydto.email;
//   return (session.email);
// }
// else
// {
//   throw new UnauthorizedException({ message: "invalid credentials" });
// }
// }




@Post('login')
  signIn(@Body() logindata: loginDTO) {
    return this.adminService.signIn(logindata);
  }



@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}

@UseGuards(AuthGuard)
@Post('addseller/:adminid')
async addManager(@Param('adminid') adminid: string, @Body() myobj: sellerEntity,): Promise<sellerEntity> {

    return this.adminService.addManager(adminid, myobj);
}

@Get('sellerlist')
async findAllseller(): Promise<sellerEntity[]> {
  return this.adminService.findAllseller();
}

@Delete('/deletemanager/:id')
deleteManagerByID(@Param('id', ParseIntPipe) id: number): any {
  return this.adminService.deleteManagerByID(id);
}



@Post('/addprofile/:userId')
async addProfile(@Param('userId') userId: string, @Body() profileDTO: AdminProfileDTO): Promise<AdminProfileEntity> {
  try {
    const createdProfile = await this.adminService.addProfile(userId, profileDTO);
    return createdProfile;
  } catch (error) {
    throw new HttpException('Failed to add admin profile', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Post('addmedicine')
  @UseInterceptors(FileInterceptor('medicinePicture', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 5000000 },
    storage: diskStorage({
      destination: './upload',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      },
    }),
  }))
  async addMedicine(
    @Body() medicineDTO: medicineDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<medicineDTO> {
    
    if (file) {
      medicineDTO.profilePicture = file.filename;
    }

    return this.adminService.addMedicine(medicineDTO);
  }


@Put('/updatemedicine/:id')
@UseInterceptors(FileInterceptor('medicinePic',
    {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 500000 },
        storage: diskStorage({
            destination: './upload/medicine',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }
))
@UsePipes(new ValidationPipe())
async updateMedicineById(@Param('id') id: string, @Body() medicineDTO: medicineDTO, @UploadedFile() medicinePic: Express.Multer.File): Promise<any> {
  medicineDTO.profilePicture = medicinePic.filename; 
  try {
    return this.adminService.updateMedicineById(id, medicineDTO);
  } catch (error) {
    return { error: 'invalid' };
  }
}

@Delete('/deletemedicine/:id')
deleteMedicineByID(@Param('id') id: string): any {
  return this.adminService.deleteMedicineByID(id);
}


@Post('addcustomer') 
async addCustomer(@Body() customerDto: customerDTO): Promise<customerEntity> {
  return this.adminService.createcustomer(customerDto);
}
@Delete('/banCustomer/:id')
banCustomerByID(@Param('id') id: string): any {
  return this.adminService.banCustomerByID(id);
}

@Get('customerlist')
async findAllcustomer(): Promise<customerEntity[]> {
  return this.adminService.findAllcustomer();
}

@Get('/seecustomerComplaints/:id')
 
async getCustomerByID(@Param('id', ParseIntPipe) id: number): Promise<customerDTO> {
  const res = await this.adminService.getCustomerByID(id);
      if (res !== null) {
          return await this.adminService.getCustomerByID(id);
      }
      else {
          throw new HttpException("Customer not founf", HttpStatus.NOT_FOUND);
      }
}
@Get('adminlist')
async findAlladmin(): Promise<AdminEntity[]> {
  return this.adminService.findAlladmin();
}



@Get('forgetpassword')
sendMail(): void {
  return this.adminService.sendMail();
}

}



