
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SellerService } from '../seller.service';
import { SellerDTO, loginDTO } from 'src/seller/DTO/seller.dto';
import * as bcrypt from 'bcrypt';
import { SellerEntity } from 'src/seller/ENTITY/seller.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(
   
    private sellerService: SellerService, 
    private jwtService: JwtService
  ) {}


  async signUp(myobj: SellerDTO): Promise<SellerDTO> {
    return await this.sellerService.addSeller(myobj);
}
  async login( logindata:loginDTO): Promise<{ access_token: string }> {
    console.log( logindata); 
    const user = await this.sellerService.findOne(logindata);
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

  getUsersById(id: string): object {
    return { message: "You id is " + id };
}


}
