import { Body,Get,Req,Param,Session,HttpStatus,HttpException, Controller, Post,UsePipes, UseInterceptors, UploadedFile, ValidationPipe, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SellerDTO, loginDTO } from 'src/seller/DTO/seller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 350000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: SellerDTO, @UploadedFile() myfile: Express.Multer.File): Promise<SellerDTO> {
        try{
      const salt = await bcrypt.genSalt();
      const hashedpassword = await bcrypt.hash(myobj.password, salt); 
      myobj.password= hashedpassword;
      myobj.filename = myfile.filename;
        return this.authService.signUp(myobj);
        }
        catch{
            throw new InternalServerErrorException("Registration failed");
          }
        
    }

  @Post('login')
  async login(@Body() logindata:loginDTO, 
  @Session() session)
 {
    try{
 if(await this.authService.login(logindata))
 {


  session.email=logindata.email;
  return this.authService.login(logindata);
  //return true;
 }
 else
 {
  throw new HttpException('UnauthorizedException', 
  HttpStatus.UNAUTHORIZED); 

 }
}

catch{
    throw new InternalServerErrorException("Failed to login");
  }


}

@Post('/logout')
    signout( @Req() req) {
        if (req.session.destroy()) {
            return 'Logged Out Successfully.';
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }
    
  }


}