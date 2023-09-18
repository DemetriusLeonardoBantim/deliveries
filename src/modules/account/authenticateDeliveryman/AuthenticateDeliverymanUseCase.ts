import { compare } from 'bcrypt'
import { prisma } from '../../../database/prismaClient'
import { sign } from 'jsonwebtoken'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase{
  constructor(
    readonly prismaDeliveryman =  prisma
  ){}

  async execute({ password, username }: IAuthenticateDeliveryman){

    const deliveryman = await this.prismaDeliveryman.deliveryman.findFirst({
      where: {
        username
      }
    })

    if(!deliveryman) {
      throw new Error("Username  or password invalid!")
    }
    const passwordMatch = await compare(password, deliveryman.password)

    if(!passwordMatch) {
      throw new Error("Username  or password invalid!")
    }

    const token = sign({username}, "batatinha123", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })
    console.log(token)
    return token
  }  
}