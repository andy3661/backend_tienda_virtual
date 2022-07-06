import { authenticate } from '@loopback/authentication';
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
  DocumentoVenta,
} from '../models';
import {CarritoDeComprasRepository} from '../repositories';
@authenticate('admin')
export class CarritoDeComprasDocumentoVentaController {
  constructor(
    @repository(CarritoDeComprasRepository) protected carritoDeComprasRepository: CarritoDeComprasRepository,
  ) { }
  @authenticate('cliente')
  @get('/carrito-de-compras/{id}/documento-ventas', {
    responses: {
      '200': {
        description: 'Array of CarritoDeCompras has many DocumentoVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DocumentoVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DocumentoVenta>,
  ): Promise<DocumentoVenta[]> {
    return this.carritoDeComprasRepository.documentoVentas(id).find(filter);
  }

  @post('/carrito-de-compras/{id}/documento-ventas', {
    responses: {
      '200': {
        description: 'CarritoDeCompras model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocumentoVenta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof CarritoDeCompras.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentoVenta, {
            title: 'NewDocumentoVentaInCarritoDeCompras',
            exclude: ['id'],
            optional: ['carritoDeComprasId']
          }),
        },
      },
    }) documentoVenta: Omit<DocumentoVenta, 'id'>,
  ): Promise<DocumentoVenta> {
    return this.carritoDeComprasRepository.documentoVentas(id).create(documentoVenta);
  }

  @patch('/carrito-de-compras/{id}/documento-ventas', {
    responses: {
      '200': {
        description: 'CarritoDeCompras.DocumentoVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentoVenta, {partial: true}),
        },
      },
    })
    documentoVenta: Partial<DocumentoVenta>,
    @param.query.object('where', getWhereSchemaFor(DocumentoVenta)) where?: Where<DocumentoVenta>,
  ): Promise<Count> {
    return this.carritoDeComprasRepository.documentoVentas(id).patch(documentoVenta, where);
  }

  @del('/carrito-de-compras/{id}/documento-ventas', {
    responses: {
      '200': {
        description: 'CarritoDeCompras.DocumentoVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DocumentoVenta)) where?: Where<DocumentoVenta>,
  ): Promise<Count> {
    return this.carritoDeComprasRepository.documentoVentas(id).delete(where);
  }
}
