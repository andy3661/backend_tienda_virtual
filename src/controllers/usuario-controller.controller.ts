// Uncomment these imports to begin using these cool features!

import { authenticate } from "@loopback/authentication";
import { repository } from "@loopback/repository";
import { HttpErrors, post, requestBody } from "@loopback/rest";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { AuthService } from "../services/auth.service";

// import {inject} from '@loopback/core';

class Credentials{
  username: string;
  password: string;
}
@authenticate('admin')
export class UsuarioControllerController {


  authService : AuthService;
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {
    this.authService = new AuthService(this.usuarioRepository);
  }
@authenticate.skip()
@post('/login',{
  responses: {
    '200':{
      description: 'Login for users'
    }
  }
})
async login(
  @requestBody() credentials: Credentials
  ): Promise<object>{
     let  user = await this.authService.Identify(credentials.username,credentials.password);
     console.log(user);
     if (user){
        let tk= await this.authService.GenerateToken(user);
        return{data: user, token: tk
        }
     }else{
       throw new HttpErrors[401]("Usuario o contraseña invalida")
     }

  }




}
