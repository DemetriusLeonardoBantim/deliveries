import { Response, Request } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateClientUseCase"

export class AuthenticateClientController {
  async handle(request: Request, response: Response){
    const { username, password } = request.body
    
    const authenticatClientUseCase = new AuthenticateUserUseCase()
    const result = await authenticatClientUseCase.execute({
      username, password
    })
    return response.json(result)
  }
}