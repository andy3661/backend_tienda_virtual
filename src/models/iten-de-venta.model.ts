import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {CarritoDeCompras} from './carrito-de-compras.model';

@model()
export class ItenDeVenta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaAgregado: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Producto)
  productoId: number;

  @belongsTo(() => CarritoDeCompras)
  carritoDeComprasId: number;

  constructor(data?: Partial<ItenDeVenta>) {
    super(data);
  }
}

export interface ItenDeVentaRelations {
  // describe navigational properties here
}

export type ItenDeVentaWithRelations = ItenDeVenta & ItenDeVentaRelations;
