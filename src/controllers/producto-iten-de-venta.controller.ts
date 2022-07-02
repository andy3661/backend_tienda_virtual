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
  ItenDeVenta,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoItenDeVentaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'Array of Producto has many ItenDeVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItenDeVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ItenDeVenta>,
  ): Promise<ItenDeVenta[]> {
    return this.productoRepository.itenDeVentas(id).find(filter);
  }

  @post('/productos/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItenDeVenta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItenDeVenta, {
            title: 'NewItenDeVentaInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) itenDeVenta: Omit<ItenDeVenta, 'id'>,
  ): Promise<ItenDeVenta> {
    return this.productoRepository.itenDeVentas(id).create(itenDeVenta);
  }

  @patch('/productos/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'Producto.ItenDeVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItenDeVenta, {partial: true}),
        },
      },
    })
    itenDeVenta: Partial<ItenDeVenta>,
    @param.query.object('where', getWhereSchemaFor(ItenDeVenta)) where?: Where<ItenDeVenta>,
  ): Promise<Count> {
    return this.productoRepository.itenDeVentas(id).patch(itenDeVenta, where);
  }

  @del('/productos/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'Producto.ItenDeVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ItenDeVenta)) where?: Where<ItenDeVenta>,
  ): Promise<Count> {
    return this.productoRepository.itenDeVentas(id).delete(where);
  }
}
