// // import { Module } from '@nestjs/common';
// // import { AdminController } from './admin.controller';
// // import { AdminService } from './admin.service';

// // @Module({
// //   controllers: [AdminController],
// //   providers: [AdminService],
// // })
// // export class AdminModule {}
// // admin.module.ts

// import { Module } from '@nestjs/common';
// import { AdminController } from './admin.controller';
// import { AdminService } from './admin.service';

// @Module({
//   controllers: [AdminController],
//   providers: [AdminService],
// })
// export class AdminModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { sellerEntity } from 'src/Seller/seller.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AdminProfileEntity } from './adminProfile.Entity';
import { medicineEntity } from './medicine.entity';
import { customerEntity } from 'src/customer/customer.entity';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, sellerEntity,AdminProfileEntity,medicineEntity,customerEntity]), // Register entities with TypeORM
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
      
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true,
        ignoreTLS: true,
        auth: {
          user: 'tanvirs264@gmail.com', 
          pass: 'slbdaubidxfvcklj ', 
        },
      },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}


