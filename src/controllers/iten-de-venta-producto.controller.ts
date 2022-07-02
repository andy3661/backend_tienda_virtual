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
  Producto,
} from '../models';
import {ItenDeVentaRepository} from '../repositories';

export class ItenDeVentaProductoController {
  constructor(
    @repository(ItenDeVentaRepository)
    public itenDeVentaRepository: ItenDeVentaRepository,
  ) { }

  @get('/iten-de-ventas/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to ItenDeVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof ItenDeVenta.prototype.id,
  ): Promise<Producto> {
    return this.itenDeVentaRepository.producto(id);
  }
}
