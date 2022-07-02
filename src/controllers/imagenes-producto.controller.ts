import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Imagenes,
  Producto,
} from '../models';
import {ImagenesRepository} from '../repositories';

export class ImagenesProductoController {
  constructor(
    @repository(ImagenesRepository)
    public imagenesRepository: ImagenesRepository,
  ) { }

  @get('/imagenes/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Imagenes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Imagenes.prototype.id,
  ): Promise<Producto> {
    return this.imagenesRepository.producto(id);
  }
}
