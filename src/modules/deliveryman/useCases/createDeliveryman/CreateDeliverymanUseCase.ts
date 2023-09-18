import {prisma} from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

interface ICreateDeliveryman{
  username: string
  password: string
}

export class CreateDeliverymanUseCase {
  constructor(
    readonly prismaClient =  prisma
  ){

  }
  async execute({ password, username }: ICreateDeliveryman){
    const clientExist = await this.prismaClient.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    })
    if(clientExist) {
      throw new Error("Deliveryman already exists")
    }
    const hashPassword = await hash(password, 10)
    const deliveryman = await this.prismaClient.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })
    return deliveryman
  }
}
