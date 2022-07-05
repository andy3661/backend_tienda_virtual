const CryptoJS = require('crypto-js');

import {ServiceKeys as Keys} from '../keys/service-keys'
export class EncryptDecrypt{
type: string;
constructor(type: string){
    this.type=type;
}


Encrypt(text: string){
switch(this.type){
    case Keys.MD5:
        return CryptoJS.MD5(text).toString();
        break;
        case Keys.AES:
            return CryptoJS.AES.encrypt(text,Keys.AES_SECRET_KEY).toString();
        break;
        case Keys.SHA_512:
        break;
        default:
            return "este tipo de encriptado no existe";
            break;
}
}

}