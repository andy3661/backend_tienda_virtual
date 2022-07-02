import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Imagenes} from './imagenes.model';
import {ItenDeVenta} from './iten-de-venta.model';
import {Categoria} from './categoria.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  calificacion?: string;

  @hasMany(() => Imagenes)
  imagenes: Imagenes[];

  @hasMany(() => ItenDeVenta)
  itenDeVentas: ItenDeVenta[];

  @belongsTo(() => Categoria)
  categoriaId: number;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
