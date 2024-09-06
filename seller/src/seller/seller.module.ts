import { Module } from "@nestjs/common";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./ENTITY/product.entity";
import { SellerEntity } from "./ENTITY/seller.entity";

import { AuthService } from "./auth/auth.service";

import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { SellerProfileEntity } from "./ENTITY/sellerprofile.entity";
import { CategoryEntity } from "./ENTITY/category.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity, ProductEntity,SellerProfileEntity,CategoryEntity]),
  JwtModule.register({
    global: true,
    secret: "3NP_Backend_Admin",
    signOptions: { expiresIn: '30m' },
  }),
  MailerModule.forRoot({
    transport: {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
    user: 'farhanamin092@gmail.com',
    pass: 'qtsj hywk xorc ctjr'
    },
    }
    })
],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}