import { Body, Controller, Get, Param, Post, Query, UsePipes,Res, ValidationPipe, HttpException, HttpStatus,Session,UploadedFile,UseInterceptors, UseGuards, Put, Delete, NotFoundException, Req, UnauthorizedException } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO, updatePictureDTO } from "./customer.dto";
import { SessionGuard } from './session.guard';
import session from "express-session";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { CustomerEntity } from "./customer.entity";
import { ProductEntity } from "src/product/product.entity";
import { CartDTO } from "src/cart/cart.dto";
import { CartEntity } from "src/cart/cart.entity";
import { OrderDTO } from "src/order/order.dto";
import { OrderEntity } from "src/order/order.entity";
import { AuthGuard } from "./auth/auth.guard";



@Controller('/customer')
export class CustomerController{
    constructor(private readonly customerService: CustomerService){}
    @UseGuards(AuthGuard)
    @Get()
    getUserswithauth(): object {
        return this.customerService.getUserswithauth();
    }


    @Get('home')
    @UseGuards(SessionGuard)
    async getUsers(@Session() session) {
        return this.customerService.getUsers(session.email);
    }

    @Post('login')
    async login(@Body() customerdata:CustomerDTO, 
    @Session() session)
    {
        if(await this.customerService.login(customerdata))
        {
            session.email=customerdata.email;
            return "logged in successfully with session";
        }
        else
        {
            throw new HttpException('UnauthorizedException', 
            HttpStatus.UNAUTHORIZED); 

        }
    }

    @Get('profile')
    @UseGuards(SessionGuard)
    async getprofile(@Session() session):Promise<CustomerEntity> {
        return this.customerService.getprofile(session.email);
    }

    @Put('updateprofile')
    @UseGuards(SessionGuard)
    async updateprofile(@Session() session,@Body() customer:CustomerDTO):Promise<CustomerEntity> {
        return this.customerService.updateprofile(session.email,customer);
    }

    @Get('viewprofilepic')
    @UseGuards(SessionGuard)
    async viewProfilePic(@Session() session,@Res() res) {
        let picdata= await this.customerService.viewProfilePic(session.email);
        if(picdata && picdata.filename)
        {
            res.sendFile(picdata.filename, { root: './upload' })
        }
    }

    @Put('updatepic')
    @UseInterceptors(FileInterceptor('myfile',
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
    async updateProfilePicture(@Session() session,@Body() myobj: updatePictureDTO, @UploadedFile() myfile: Express.Multer.File) {
        myobj.filename = myfile.filename;
        return this.customerService.updateProfilePicture(myobj,session.email);
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })
    }

    @Delete('deleteprofile')
    @UseGuards(SessionGuard)
    async deleteprofile(@Session() session){
        return this.customerService.deleteprofile(session.email);
    }

    @Get('product')
    async getallproduct():Promise<ProductEntity[]> {
        return this.customerService.getallproduct();
    }

    @Get('product/:name')
    async getProductByName(@Param('name') name: string): Promise<ProductEntity> {
        const product = await this.customerService.getProductByName(name);
        if (!product) {
            throw new NotFoundException(`Product with name '${name}' not found.`);
        }
        return product;
    }

    @Post('cart')
    // @UsePipes(new ValidationPipe)
    // addToCart(@Body() cart: CartDTO): object {
    //     try{
    //       return this.customerService.addToCart(cart);
    //     }
    //     catch{
    //         return {error: 'invalid'};
    //     }
    // }
    @UseGuards(SessionGuard)
    async addToCart(@Session() session, @Body() myobj: CartDTO,): Promise<CartEntity> {

        return this.customerService.addToCart(session.email, myobj);
    }

    @Get('viewcart')
    @UseGuards(SessionGuard)
    async getCart(@Session() session):Promise<CartEntity> {
        return this.customerService.getCart(session.email);
    }

    @Post('order')
    @UseGuards(SessionGuard)
    async createOrder(@Session() session, @Body() order: OrderDTO ): Promise<OrderEntity> {
        return this.customerService.createOrder(session.email, order);
    }


    @Get('vieworder')
    @UseGuards(SessionGuard)
    async getOrder(@Session() session): Promise<OrderEntity[]> {
        return this.customerService.getOrder(session.email);
    }

    // @Get('getallcustomer')
    // async getAllCustomers(): Promise<CustomerEntity[]>
    // {
    //     return this.customerService.getAllCustomers();
    // }
    @Post('/logout')
    signout( @Req() req) {
        if (req.session.destroy()) {
            return 'Logged Out Successfully.';
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }
   
  }

  @Get('forgetpassword')
    sendMail(): void {
    return this.customerService.sendMail();
}
}   
