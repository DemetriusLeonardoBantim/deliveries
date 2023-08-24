import { prisma } from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

interface ICreateClient{
  username: string
  password: string
}

export class CreateClientUseCase {
  constructor(
    readonly prismaClient =  prisma
  ){

  }
  async execute({ password, username }: ICreateClient){
    const clientExist = await this.prismaClient.clients.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    })
    if(clientExist) {
      throw new Error("Client already exists")
    }
    const hashPassword = await hash(password, 10)
    const client = await this.prismaClient.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })
    return client
  }
}
