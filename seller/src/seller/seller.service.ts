import { Injectable,HttpStatus,HttpException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './ENTITY/product.entity';
//import { ProductDto } from './seller.dto';
import { SellerEntity } from "./ENTITY/seller.entity";
import { loginDTO, SellerDTO } from "./DTO/seller.dto";
import { UpdateDTO } from "./DTO/product.dto";
import { JwtService } from '@nestjs/jwt';
import { SellerProfileEntity } from './ENTITY/sellerprofile.entity';
import { CategoryEntity } from './ENTITY/category.entity';
import { MailerService } from "@nestjs-modules/mailer/dist";
//import { MailerService } from "@nestjs-modules/mailer/dist";


@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(ProductEntity)
    private  productRepo: Repository<ProductEntity>,


    @InjectRepository(SellerEntity)
    private sellerRepo: Repository<SellerEntity>,

    @InjectRepository(SellerProfileEntity)
    private sellerProfileRepo: Repository<SellerProfileEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepo:    Repository<CategoryEntity>,

    private mailerService : MailerService


  ) { }


  async addProduct(myobj: ProductEntity): Promise<ProductEntity> {
    return await this.productRepo.save(myobj);
}


async addSeller(myobj: SellerEntity): Promise<SellerEntity> {
  return await this.sellerRepo.save(myobj);
}

async searchSeller(myobj: SellerEntity): Promise<SellerEntity> {
  return await this.sellerRepo.findOneBy({email:myobj.email});
}

getUser(): object {
  return { message: "Welcome Seller" }
}

async findOne( logindata:loginDTO): Promise<any> {
  return await this.sellerRepo.findOneBy({email:logindata.email});
}



async getProductByID(productId) {
  const data=await this.productRepo.findOneBy({ productId });
  console.log(data);
  if(data!==null) {
      return data;
  }
 else 
 {
  throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
 }

}

async updateProduct(id:number, UpdateProduct:UpdateDTO):Promise<ProductEntity>{
  await this.productRepo.update(id,UpdateProduct);
  return await this.productRepo.findOneBy({productId:id});
}

async updateProfile(email:string, sellerdata:SellerDTO):Promise<SellerEntity>
  {
      await this.sellerRepo.update(email,sellerdata);
      return await this.sellerRepo.findOneBy({email:email});

  }

async viewAllProduct():Promise<ProductEntity[]>
    {
        return await this.productRepo.find();
    }


    async searchProduct(name:string):Promise<ProductEntity>
    {
        return await this.productRepo.findOneBy({productName:name});
    }


    async deleteProduct(name:string):Promise<void>
    {
        await this.productRepo.delete({ productName : name});
    }

    async viewProfile(email:string):Promise<SellerEntity> {
      return this.sellerRepo.findOneBy({email:email})
  }

  async updateprofile(email:string, customerdata:SellerDTO):Promise<SellerEntity>
  {
      await this.sellerRepo.update({email:email},customerdata);
      return await this.sellerRepo.findOneBy({email:email});
  
      
      
      
  }


  async deleteProfile(email:string) {
      let res = await this.sellerRepo.delete({email:email});
      if(res)
      {
          return "profile deleted successfully";
      }
  }



    getAll(): Promise<SellerEntity[]> {
      return this.sellerRepo.find(
        {
          select:{
            name: true,
            email: true
          
          }
          
        }
      );
    }


    async getByEmail(email: string): Promise<SellerEntity> {
    return this.sellerRepo.findOne({ where: { email }, select: ['name', 'email'] });
    }


  

    updateSeller(name,id):any {
      console.log(name+id);
      return this.sellerRepo.update(id,{name:name});
      }



  async updateSellerByEmail(
    email: string,
    updatedSellerData: Partial<SellerEntity>,
  ): Promise<SellerEntity> {
    try {
      const seller = await this.sellerRepo.findOneBy({
        email,
      });

      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
      Object.assign(seller, updatedSellerData);
      const updatedSeller =
        await this.sellerRepo.save(seller);
      return updatedSeller;
    } catch (error) {
      throw new Error('Failed to update seller');
    }
  }


    async createProfile(profileInfo: SellerProfileEntity): Promise<SellerProfileEntity> {
      const newProfile = this.sellerProfileRepo.create(profileInfo);
      return this.sellerProfileRepo.save(newProfile);
    }






    async addProductToCategory(productId: number, categoryId: number): Promise<void> {

      const product = await this.productRepo.findOne({ where: { productId: productId } });
      const category = await this.categoryRepo. findOne({ where: { id: categoryId } });



      if (product && category) {
        if (!product.categories) {
            product.categories = []; 
        }
        product.categories.push(category); // 
        await this.productRepo.save(product);
    }


      }
      async removeProductFromCategory(productId: number, categoryId: number): Promise<void> {

      const product = await this.productRepo.findOne({ where: { productId: productId } });
    const category = await this.categoryRepo.findOne({ where: { id: categoryId } });
    if (product && category) {
      if (product.categories) { 
          product.categories = product.categories.filter((c) => c.id !== category.id);
          await this.productRepo.save(product);
      }
  }
      }
      async getProductsWithCategories(): Promise<ProductEntity[]> {
      return this.productRepo.find({ relations: ['categories'] });
      }



    
      async createPro(email: string, profile: SellerProfileEntity): Promise<object> {
        
        let seller = await this.sellerRepo.findOneBy({email:email});
        profile.seller = seller;

        try{
        return await this.sellerProfileRepo.save(profile);
        }
        catch (error) {
          return { error: 'One seller cannot have more than one profile' };

        }
    }

    sendMail() : void {
      this.mailerService.sendMail({
        to: 'farhanamin092@gmail.com',
        from: 'ahmed.farhan.amin@gmail.com',
        subject: 'Testing mailer',
        text: 'shahriar hossain galib',
        html: '<b>Your OTP is 5555</b>',
      })
    }

}
  



