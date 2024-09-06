
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/seller/auth/auth.module';

@Module({
  imports: [SellerModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'farhan',
    database: 'MyDatabase',
    autoLoadEntities: true,
    synchronize: true,
    } ), AuthModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
