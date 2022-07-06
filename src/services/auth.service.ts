import { repository } from "@loopback/repository";
import { UsuarioRepository } from "../repositories";
import {Usuario} from "../models";
import {ServiceKeys as Keys} from "../keys/service-keys";
import { EncryptDecrypt } from "./encrypt-decrypt.service";
const jwt = require("jsonwebtoken");

export class AuthService{
    constructor(
  @repository(UsuarioRepository)
  public usuarioRepository: UsuarioRepository
){

    }

async Identify(username: string, password: string): Promise<Usuario|  false>{
    console.log("entra");
let user =await this.usuarioRepository.findOne({where:{nombre_usuario: username}});
console.log(user);
if(user){
let cryptPass = new EncryptDecrypt(Keys.LOGIN_CRYPT_METHOD).Encrypt(password);
if(user.contrasena == cryptPass){
    return user;
}
}
return false;
}

async GenerateToken(user:Usuario){
    
user.contrasena = '';
let token =  jwt.sign({
 exp: Keys.TOKEN_EXPIRATION_TIME,
 data:{
     _id: user.id,
     role_id: user.roleId,
     username: user.nombre_usuario,
     paternId: user.clienteId,


 }
},
Keys.JWT_SECRET_KEY);
return token;
}

// verificar token

VerificarTokenJWT(token: string){
    try {
 let decode = jwt.verify(token,Keys.JWT_SECRET_KEY);
 return decode;
}catch{
    return null;
}

}
}

