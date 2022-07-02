import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {TiendaDataSource} from '../datasources';
import {Producto, ProductoRelations, Imagenes, ItenDeVenta, Categoria} from '../models';
import {ImagenesRepository} from './imagenes.repository';
import {ItenDeVentaRepository} from './iten-de-venta.repository';
import {CategoriaRepository} from './categoria.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly imagenes: HasManyRepositoryFactory<Imagenes, typeof Producto.prototype.id>;

  public readonly itenDeVentas: HasManyRepositoryFactory<ItenDeVenta, typeof Producto.prototype.id>;

  public readonly categoria: BelongsToAccessor<Categoria, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.tienda') dataSource: TiendaDataSource, @repository.getter('ImagenesRepository') protected imagenesRepositoryGetter: Getter<ImagenesRepository>, @repository.getter('ItenDeVentaRepository') protected itenDeVentaRepositoryGetter: Getter<ItenDeVentaRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Producto, dataSource);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
    this.itenDeVentas = this.createHasManyRepositoryFactoryFor('itenDeVentas', itenDeVentaRepositoryGetter,);
    this.registerInclusionResolver('itenDeVentas', this.itenDeVentas.inclusionResolver);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenesRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
  }
}
