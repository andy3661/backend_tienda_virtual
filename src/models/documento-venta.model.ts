import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CarritoDeCompras} from './carrito-de-compras.model';

@model()
export class DocumentoVenta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_creacion: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  informacion_productos?: String;

  @property({
    type: 'number',
  })
  total?: number;

  @belongsTo(() => CarritoDeCompras)
  carritoDeComprasId: number;

  constructor(data?: Partial<DocumentoVenta>) {
    super(data);
  }
}

export interface DocumentoVentaRelations {
  // describe navigational properties here
}

export type DocumentoVentaWithRelations = DocumentoVenta & DocumentoVentaRelations;
