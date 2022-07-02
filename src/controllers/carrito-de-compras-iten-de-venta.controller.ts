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
  CarritoDeCompras,
  ItenDeVenta,
} from '../models';
import {CarritoDeComprasRepository} from '../repositories';

export class CarritoDeComprasItenDeVentaController {
  constructor(
    @repository(CarritoDeComprasRepository) protected carritoDeComprasRepository: CarritoDeComprasRepository,
  ) { }

  @get('/carrito-de-compras/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'Array of CarritoDeCompras has many ItenDeVenta',
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
    return this.carritoDeComprasRepository.itenDeVentas(id).find(filter);
  }

  @post('/carrito-de-compras/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'CarritoDeCompras model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItenDeVenta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof CarritoDeCompras.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItenDeVenta, {
            title: 'NewItenDeVentaInCarritoDeCompras',
            exclude: ['id'],
            optional: ['carritoDeComprasId']
          }),
        },
      },
    }) itenDeVenta: Omit<ItenDeVenta, 'id'>,
  ): Promise<ItenDeVenta> {
    return this.carritoDeComprasRepository.itenDeVentas(id).create(itenDeVenta);
  }

  @patch('/carrito-de-compras/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'CarritoDeCompras.ItenDeVenta PATCH success count',
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
    return this.carritoDeComprasRepository.itenDeVentas(id).patch(itenDeVenta, where);
  }

  @del('/carrito-de-compras/{id}/iten-de-ventas', {
    responses: {
      '200': {
        description: 'CarritoDeCompras.ItenDeVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ItenDeVenta)) where?: Where<ItenDeVenta>,
  ): Promise<Count> {
    return this.carritoDeComprasRepository.itenDeVentas(id).delete(where);
  }
}
