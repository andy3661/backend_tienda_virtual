import { AuthenticationStrategy } from "@loopback/authentication";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import parseBearerToken from 'parse-bearer-token';
import { service } from "@loopback/core";
import { AuthService } from "../services/auth.service";
import {ServiceKeys as Keys} from "../keys/service-keys"


export class AdministradorStrategy implements AuthenticationStrategy {
    name: string = 'admin';

    constructor(@service(AuthService)
    public servicioJWT: AuthService){

    }


   async authenticate(request: Request): Promise<UserProfile  | undefined> {
       
    const token = parseBearerToken(request);
    if(!token){
   throw new HttpErrors[401]("No existe token en la solicitud.")
    }
        let info = this.servicioJWT.VerificarTokenJWT(token);
        if(info){
            if(info.data.role_id=Keys.ADMIN_ID){
            let perfil: UserProfile = Object.assign({
                id: info.data.id,
                nombre_usuario: info.data.nombre_usuario,
                role_id: info.data.role_id,

            });
            return perfil;
            }else{
                throw new HttpErrors[401]("El token enviado es valido, pero no posee los permisos suficientes");
            }
        }else{
            throw new HttpErrors[401]("El token enviado no es valido");
        }
        
    }

    
}