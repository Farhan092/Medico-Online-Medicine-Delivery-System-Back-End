import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './customer/auth/auth.module';


@Module({
  imports: [CustomerModule,AuthModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'user',
    autoLoadEntities: true,
    synchronize: true,
    } ),
  AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
