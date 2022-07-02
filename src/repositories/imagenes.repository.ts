import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TiendaDataSource} from '../datasources';
import {Imagenes, ImagenesRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ImagenesRepository extends DefaultCrudRepository<
  Imagenes,
  typeof Imagenes.prototype.id,
  ImagenesRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof Imagenes.prototype.id>;

  constructor(
    @inject('datasources.tienda') dataSource: TiendaDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Imagenes, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
