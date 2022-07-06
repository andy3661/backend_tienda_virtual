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
  ItenDeVenta,
  CarritoDeCompras,
} from '../models';
import {ItenDeVentaRepository} from '../repositories';
@authenticate('admin','cliente')
export class ItenDeVentaCarritoDeComprasController {
  constructor(
    @repository(ItenDeVentaRepository)
    public itenDeVentaRepository: ItenDeVentaRepository,
  ) { }

  @get('/iten-de-ventas/{id}/carrito-de-compras', {
    responses: {
      '200': {
        description: 'CarritoDeCompras belonging to ItenDeVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CarritoDeCompras)},
          },
        },
      },
    },
  })
  async getCarritoDeCompras(
    @param.path.number('id') id: typeof ItenDeVenta.prototype.id,
  ): Promise<CarritoDeCompras> {
    return this.itenDeVentaRepository.carritoDeCompras(id);
  }
}
