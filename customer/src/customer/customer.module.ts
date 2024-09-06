import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerEntity } from "./customer.entity";
import { AuthService } from "./auth/auth.service";
import { ProductEntity } from "src/product/product.entity";
import { CartEntity } from "src/cart/cart.entity";
import { OrderEntity } from "src/order/order.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { JwtModule } from "@nestjs/jwt";




@Module({
    imports: [TypeOrmModule.forFeature([CustomerEntity,ProductEntity,CartEntity,OrderEntity]),
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
      user: 'claude.mta@gmail.com',
      pass: 'vmcy kssy pmhy svjb'
      },
      }
      })
      
  ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService],
  })
  export class CustomerModule {}