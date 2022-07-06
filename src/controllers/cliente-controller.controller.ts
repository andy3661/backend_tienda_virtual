import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cliente} from '../models';
import { Usuario } from '../models/usuario.model';
import {ClienteRepository} from '../repositories';
import { UsuarioRepository } from '../repositories/usuario.repository';
import{EncryptDecrypt} from '../services/encrypt-decrypt.service';
import {ServiceKeys as Keys} from '../keys/service-keys'
import { authenticate } from '@loopback/authentication';
@authenticate('admin')
export class ClienteControllerController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @repository(UsuarioRepository)
    public UsuarioRepository : UsuarioRepository,
  ) {}
  @authenticate.skip()
  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id','usuario'],
            
          
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    let c=  await this.clienteRepository.create(cliente);
    let password1 = new EncryptDecrypt(Keys.MD5).Encrypt(c.documento);
    let password2 = new EncryptDecrypt(Keys.MD5).Encrypt(password1);
    let u ={
       nombre_usuario: c.correo,
       contrasena: password2,
       clienteId: c.id
    };

    let usuario = await this.UsuarioRepository.create(u);
    usuario.contrasena ='';
       c.usuario = usuario;
    
    return c;

  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }
  @authenticate('cliente')
  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }
  @authenticate('cliente')
  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }
  @authenticate('cliente')
  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    let u = await this.UsuarioRepository.findOne({where:{clienteId:cliente.id}})
    if(u){
      u.nombre_usuario= cliente.correo;
      await this.UsuarioRepository.replaceById(u.id,u)
    }
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
