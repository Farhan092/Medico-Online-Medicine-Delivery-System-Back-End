import { Controller,HttpException,Request,Req,Get,Put,Patch,UnauthorizedException,Param,Res,ParseIntPipe,Delete,Session, Post, Body, UseInterceptors,Query, UploadedFile, UsePipes,HttpStatus,UseGuards, ValidationPipe, InternalServerErrorException } from '@nestjs/common';
import { SellerService } from './seller.service';
import { ProductDTO,UpdateDTO  } from 'src/seller/DTO/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError,diskStorage } from 'multer';
import { SellerEntity } from './ENTITY/seller.entity';
import { ProductEntity } from './ENTITY/product.entity';
//import { SessionGuard } from "./session.guard";
import { AuthGuard } from './auth/auth.guard';

import * as bcrypt from 'bcrypt';
import { SellerDTO, loginDTO} from 'src/seller/DTO/seller.dto';
import { SessionGuard } from './session.guard';
import { SellerProfileEntity } from './ENTITY/sellerprofile.entity';



@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

    @UseGuards(AuthGuard)
    @Get()
    getUsers(): object {
        return this.sellerService.getUser();
    }

    @UseGuards(AuthGuard)
    @Get('index')
    //@UseGuards(SessionGuard)
    async getIndex(@Session() session) {

    const seller = await this.sellerService.getByEmail(session.email);
    return { name: seller.name, email: seller.email };
   
    }


  @UseGuards(AuthGuard)
  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    try{
    res.sendFile(name,{ root: './upload' })
    }

    catch (error) {
      return { error: 'file not available' };
    }
    
  }

  @UseGuards(AuthGuard)
  // @UseGuards(SessionGuard)
  @Get('/getproduct/:id')
  async getProductByID(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    const res = await this.sellerService.getProductByID(id);
        if (res !== null) {
            return await this.sellerService.getProductByID(id);
        }
        else {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
  }


  @UseGuards(AuthGuard)
  @Post('addproduct')
  @UseInterceptors(FileInterceptor('filename', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
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
  @UsePipes(new ValidationPipe())
  async addProduct(@Body() myobj: ProductDTO, @UploadedFile() myFile: Express.Multer.File) {

    if (!myFile) {
      throw new HttpException('Provide image', HttpStatus.BAD_REQUEST);
    }
    myobj.filename = myFile.filename;

    return this.sellerService.addProduct(myobj);
  }




  @Put('/update/:id')
    @UseInterceptors(FileInterceptor('filename',
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
    updateProduct(@Param('id') id:number, @Body() updateProduct:UpdateDTO,@UploadedFile() myfile: Express.Multer.File):object
    {   
      updateProduct.filename = myfile.filename;
      try{
        return this.sellerService.updateProduct(id,updateProduct);
    }

    catch{
      return {error: 'invalid'};
  }

   }





    @Get('/view_all_product')
    async viewAllProduct():Promise<ProductEntity[]>
    {
        return this.sellerService.viewAllProduct();
    }



    @Get('/search_product/:name')
    async searchProductByName(@Param('name') name:string):Promise<ProductEntity>
    {
        return this.sellerService.searchProduct(name);
    }

    @Delete('/delete_product')
    deleteProductByName(@Query('name') name:string):object
    {
       return this.sellerService.deleteProduct(name);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }




    @UseGuards(AuthGuard)
    @Get('viewprofile')
    async viewProfile(@Session() session):Promise<SellerEntity> {
        return this.sellerService.viewProfile(session.email);
    }

    
    @UseGuards(AuthGuard)
    @Delete('deleteprofile')
    @UseGuards(SessionGuard)
    async deleteSellerProfile(@Session() session){
        return this.sellerService.deleteProfile(session.email);
    }

    


  // @Post('sendemail')
  // //@UseGuards(new SessionGuard)
  // sendEmail(@Body() mydata) {
  //   return this.sellerService.sendEmail(mydata);
  // }

  @UseGuards(AuthGuard)
  @Patch('/updateSeller/:email')
  async updateSeller(
    @Param('email') email: string,
    @Body() updatedSellerData: Partial<SellerEntity>,
  ): Promise<SellerEntity> {
    return this.sellerService.updateSellerByEmail(email, updatedSellerData);
  }
  
  @UseGuards(AuthGuard)
    @Post('pro')
    @UseGuards(SessionGuard)
     async createProfile(@Session() session, @Body() profile: SellerProfileEntity ): Promise<object> {
     
        return this.sellerService.createPro(session.email, profile);

  }
  @UseGuards(AuthGuard)
  @Post(':productId/categories/:categoryId')
  async addProductToCategory(@Param('productId') productId: number, @Param('categoryId') categoryId: number): Promise<void> {
    
    await this.sellerService.addProductToCategory(productId, categoryId);

    }

  @UseGuards(AuthGuard)
  @Get('gg')
  async getProductsWithCategories(): Promise<ProductEntity[]> {
    return this.sellerService.getProductsWithCategories();
  }

  @UseGuards(AuthGuard)
  @Put('updateprofile')
    //@UseGuards(SessionGuard)
    async updateprofile(@Session() session,@Body() seller:SellerDTO):Promise<SellerEntity> {
      try{
        return this.sellerService.updateprofile(session.email,seller);
      }
      catch{
        throw new InternalServerErrorException(" Profile update failed");
     }

    }

    @Get('forgetpassword')
    sendMail(): void {
    return this.sellerService.sendMail();
}


}






