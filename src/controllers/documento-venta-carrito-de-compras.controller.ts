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
  DocumentoVenta,
  CarritoDeCompras,
} from '../models';
import {DocumentoVentaRepository} from '../repositories';
@authenticate('admin','cliente')
export class DocumentoVentaCarritoDeComprasController {
  constructor(
    @repository(DocumentoVentaRepository)
    public documentoVentaRepository: DocumentoVentaRepository,
  ) { }

  @get('/documento-ventas/{id}/carrito-de-compras', {
    responses: {
      '200': {
        description: 'CarritoDeCompras belonging to DocumentoVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CarritoDeCompras)},
          },
        },
      },
    },
  })
  async getCarritoDeCompras(
    @param.path.number('id') id: typeof DocumentoVenta.prototype.id,
  ): Promise<CarritoDeCompras> {
    return this.documentoVentaRepository.carritoDeCompras(id);
  }
}
