import { compare } from 'bcrypt'
import { prisma } from '../../../database/prismaClient'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateUserUseCase{
  constructor(
    readonly prismaClient =  prisma
  ){}

  async execute({ password, username }: IAuthenticateClient){
    console.log(password, username)
    const client = await this.prismaClient.clients.findFirst({
      where: {
        username
      }
    })
    console.log(client)
    if(!client) {
      throw new Error("Username  or password invalid!")
    }
    const passwordMatch = await compare(password, client.password)
    console.log(passwordMatch)
    if(!passwordMatch) {
      throw new Error("Username  or password invalid!")
    }

    const token = sign({username}, "batatinha123", {
      subject: client.id,
      expiresIn: "1d"
    })
    console.log(token)
    return token
  }  
}