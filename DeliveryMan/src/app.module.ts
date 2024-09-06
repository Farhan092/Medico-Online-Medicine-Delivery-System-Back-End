import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliverymanModule} from './deliveryman/deliveryman.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './deliveryman/auth/auth.module';

@Module({
  imports: [DeliverymanModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1510',
    database: 'Deliveryman',
    autoLoadEntities: true,
    synchronize: true,
    } ), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}