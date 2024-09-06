import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer.service';
import { CustomerDTO, loginDTO } from 'src/customer/customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService, 
    private jwtService: JwtService
  ) {}
  async signUp(myobj: CustomerDTO): Promise<CustomerDTO> {
    return await this.customerService.addCustomer(myobj);
}
  async signIn( logindata:loginDTO): Promise<{ access_token: string }> {
    const user = await this.customerService.findOne(logindata);
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