
import { Body, Controller, Get, Param, Put, Post, Delete, Query, UsePipes, ValidationPipe, Session, UseGuards, HttpException, HttpStatus, UseInterceptors, UploadedFile, Req, UnauthorizedException } from "@nestjs/common";
import { DeliverymanService} from "./deliveryman.service";
import { DeliverymanDTO, updatePictureDTO } from "./deliveryman.dto";
import { DeliverymanEntity} from './deliveryman.entity';
import session from "express-session";
import { SessionGuard } from './session.guard';
import { SeeorderEntity } from "./orders/order.entity";
import { OrderStatusDTO } from "./orders/order.dto";
import { MulterError, diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('/deliveryman')
export class DeliverymanController{
    constructor(private readonly deliverymanService: DeliverymanService){}

    @Get()
    getUsers(): object {
        return this.deliverymanService.getUsers();
    }

    @Post('login')
    async login(@Body() deliverymandata:DeliverymanDTO, 
    @Session() session)
    {
        if(await this.deliverymanService.login(deliverymandata))
        {
            session.email=deliverymandata.email;
            return "logged in successfully with session";
        }
        else
        {
            throw new HttpException('UnauthorizedException', 
            HttpStatus.UNAUTHORIZED); 

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
  
    @Get('profile')
    @UseGuards(SessionGuard)
    async getprofile(@Session() session):Promise<DeliverymanEntity> {
        return this.deliverymanService.getprofile(session.email);
    }

    @Put('updateprofile')
    @UseGuards(SessionGuard)
    async updateprofile(@Session() session,@Body() deliveryman:DeliverymanDTO):Promise<DeliverymanEntity> {
        return this.deliverymanService.updateprofile(session.email,deliveryman);
    }

    @Put('updatepic')
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
    async updateProfilePicture(@Session() session,@Body() myobj: updatePictureDTO, @UploadedFile() profilePic: Express.Multer.File) {
        myobj.filename = profilePic.filename;
        return this.deliverymanService.updateProfilePicture(myobj,session.email);
    }

    @Delete('deleteprofile')
    @UseGuards(SessionGuard)
    async deleteprofile(@Session() session){
        return this.deliverymanService.deleteprofile(session.email);
    }

    @Get('orders')
    @UseGuards(SessionGuard)
    async getorder(@Session() session):Promise<SeeorderEntity[]> {
        return await this.deliverymanService.getorder();
    }

    @Put('updatestatus/:orderId')
    @UseGuards(SessionGuard)
    async updateDeliveryStatus(@Param('orderId') orderId:string, @Body() text:OrderStatusDTO) {
        return this.deliverymanService.updatDeliveryStatus(orderId, text);
    }

    @Get('/search_orders/:email')
    @UseGuards(SessionGuard)
    async searchOrders(@Param('email') email:string):Promise<SeeorderEntity>
    {
        return this.deliverymanService.searchOrders(email);
    }

    @Get('forgetpassword')
    sendMail(): void {
  return this.deliverymanService.sendMail();
}
}
