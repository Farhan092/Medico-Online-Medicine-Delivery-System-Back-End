import { Injectable } from "@nestjs/common";
import { DeliverymanDTO, loginDTO, updatePictureDTO } from "./deliveryman.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DeliverymanEntity} from "./deliveryman.entity"; 
import * as bcrypt from 'bcrypt';
import { SeeorderEntity } from "./orders/order.entity";
import { OrderStatusDTO } from "./orders/order.dto";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class DeliverymanService {
    updatdelstatus(orderId: string): SeeorderEntity | PromiseLike<SeeorderEntity> {
        throw new Error("Method not implemented.");
    }

  constructor(
    @InjectRepository(DeliverymanEntity)
    private deliverymanRepo: Repository<DeliverymanEntity>,

    @InjectRepository(SeeorderEntity)
    private seeorderRepo: Repository<SeeorderEntity>,

    private mailerService: MailerService
) {}


getUsers(): object {
    return { message: "hello Deliveryman" }
}

async login(deliverymandata:DeliverymanDTO)
{
    const deliveryman = await this.deliverymanRepo.findOneBy({email:deliverymandata.email});
    const result =  await bcrypt.compare(deliverymandata.password, deliveryman.password);
    if(result)
    {
        return true;
    }
    else{
        return false;
    }
}

async getprofile(email:string):Promise<DeliverymanEntity> {
    return this.deliverymanRepo.findOneBy({email:email})
}

async updateprofile(email:string, deliverymandata:DeliverymanDTO):Promise<DeliverymanEntity>
{
    await this.deliverymanRepo.update({email:email},deliverymandata);
    return await this.deliverymanRepo.findOneBy({email:email});  
}


async updateProfilePicture(myobj: updatePictureDTO,email:string)
    {
        let deliveryman=await this.deliverymanRepo.findOneBy({email})
        if(deliveryman)
        {
            deliveryman.filename=myobj.filename;
            return await this.deliverymanRepo.save(deliveryman);
        }
       
    }

async deleteprofile(email:string) {
    let res = await this.deliverymanRepo.delete({email:email});
    if(res)
    {
        return "profile deleted successfully";
    }
}


async addDeliveryman(myobj: DeliverymanEntity): Promise<DeliverymanEntity>
{
    return await this.deliverymanRepo.save(myobj);
}


async findOne( logindata:loginDTO): Promise<any> {
    return await this.deliverymanRepo.findOneBy({email:logindata.email});
}

async getorder():Promise <SeeorderEntity[]>{
    return await this.seeorderRepo.find()
}

async updatDeliveryStatus(orderId:string, text:OrderStatusDTO)
{
await this.seeorderRepo.update({OrderId:orderId},text);
        return await this.seeorderRepo.findOneBy({OrderId:orderId});
}

async searchOrders(email:string):Promise<SeeorderEntity>
    {
        return await this.seeorderRepo.findOneBy({email:email});
    }

    sendMail() : void {
        this.mailerService.sendMail({
          to: 'nokibularfin@gmail.com',
          from: 'shariar@gmail.com',
          subject: 'Testing mailer',
          text: 'welcome',
          html: '<b>Your OTP is 5587</b>',
        })
      }

}

