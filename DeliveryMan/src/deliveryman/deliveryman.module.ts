import { Module } from "@nestjs/common";
import {DeliverymanController } from "./deliveryman.controller";
import { DeliverymanService } from "./deliveryman.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeliverymanEntity} from "./deliveryman.entity";
import { SeeorderEntity } from "./orders/order.entity";
import { MailerModule } from "@nestjs-modules/mailer";



@Module({


    imports: [TypeOrmModule.forFeature([DeliverymanEntity, SeeorderEntity]),
    MailerModule.forRoot({
      transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
      user: 'nokibularfin@gmail.com',
      pass: 'nibg djyw onpe odvz'
      },
      }
      })],
    controllers: [DeliverymanController],
    providers: [DeliverymanService],
    exports: [DeliverymanService],
  })
  export class DeliverymanModule {}