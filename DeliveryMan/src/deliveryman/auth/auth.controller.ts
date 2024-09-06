import { Body, Controller, Post,UsePipes, UseInterceptors, UploadedFile, ValidationPipe, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DeliverymanDTO, loginDTO } from 'src/deliveryman/deliveryman.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
    @UseInterceptors(FileInterceptor('profilePic',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: DeliverymanDTO, @UploadedFile() myfile: Express.Multer.File): Promise<DeliverymanDTO> {
      const salt = await bcrypt.genSalt();
      const hashedpassword = await bcrypt.hash(myobj.password, salt); 
      myobj.password= hashedpassword;
      myobj.filename = myfile.filename;
        return this.authService.signUp(myobj);
    }
  @Post('login')
  signIn(@Body() logindata: loginDTO) {
    return this.authService.signIn(logindata);
  }

 
}