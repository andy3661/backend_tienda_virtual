import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {ItenDeVenta} from './iten-de-venta.model';
import {Cliente} from './cliente.model';
import {DocumentoVenta} from './documento-venta.model';

@model()
export class CarritoDeCompras extends Entity {
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

  @hasMany(() => ItenDeVenta)
  itenDeVentas: ItenDeVenta[];

  @belongsTo(() => Cliente)
  clienteId: number;

  @hasMany(() => DocumentoVenta)
  documentoVentas: DocumentoVenta[];

  constructor(data?: Partial<CarritoDeCompras>) {
    super(data);
  }
}

export interface CarritoDeComprasRelations {
  // describe navigational properties here
}

export type CarritoDeComprasWithRelations = CarritoDeCompras & CarritoDeComprasRelations;
