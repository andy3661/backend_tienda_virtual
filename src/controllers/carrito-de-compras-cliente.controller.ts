import { authenticate } from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CarritoDeCompras,
  Cliente,
} from '../models';
import {CarritoDeComprasRepository} from '../repositories';


export class CarritoDeComprasClienteController {
  constructor(
    @repository(CarritoDeComprasRepository)
    public carritoDeComprasRepository: CarritoDeComprasRepository,
  ) { }
  @authenticate('cliente')
  @get('/carrito-de-compras/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to CarritoDeCompras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof CarritoDeCompras.prototype.id,
  ): Promise<Cliente> {
    return this.carritoDeComprasRepository.cliente(id);
  }
}
