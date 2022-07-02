import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TiendaDataSource} from '../datasources';
import {Prueba, PruebaRelations} from '../models';

export class PruebaRepository extends DefaultCrudRepository<
  Prueba,
  typeof Prueba.prototype.id,
  PruebaRelations
> {
  constructor(
    @inject('datasources.tienda') dataSource: TiendaDataSource,
  ) {
    super(Prueba, dataSource);
  }
}
