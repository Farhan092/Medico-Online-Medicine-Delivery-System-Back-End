import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { DeliverymanService } from '../deliveryman.service';
import { DeliverymanDTO, loginDTO } from 'src/deliveryman/deliveryman.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private deliverymanService: DeliverymanService, 
    private jwtService: JwtService
  ) {}
  async signUp(myobj: DeliverymanDTO): Promise<DeliverymanDTO> {
    return await this.deliverymanService.addDeliveryman(myobj);
}
  async signIn( logindata:loginDTO): Promise<{ access_token: string }> {
    const user = await this.deliverymanService.findOne(logindata);
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
}