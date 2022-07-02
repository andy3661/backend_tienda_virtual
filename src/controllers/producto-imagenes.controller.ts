import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producto,
  Imagenes,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoImagenesController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Array of Producto has many Imagenes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagenes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Imagenes>,
  ): Promise<Imagenes[]> {
    return this.productoRepository.imagenes(id).find(filter);
  }

  @post('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagenes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagenes, {
            title: 'NewImagenesInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) imagenes: Omit<Imagenes, 'id'>,
  ): Promise<Imagenes> {
    return this.productoRepository.imagenes(id).create(imagenes);
  }

  @patch('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Producto.Imagenes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagenes, {partial: true}),
        },
      },
    })
    imagenes: Partial<Imagenes>,
    @param.query.object('where', getWhereSchemaFor(Imagenes)) where?: Where<Imagenes>,
  ): Promise<Count> {
    return this.productoRepository.imagenes(id).patch(imagenes, where);
  }

  @del('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Producto.Imagenes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Imagenes)) where?: Where<Imagenes>,
  ): Promise<Count> {
    return this.productoRepository.imagenes(id).delete(where);
  }
}
