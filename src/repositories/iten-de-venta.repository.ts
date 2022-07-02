import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TiendaDataSource} from '../datasources';
import {ItenDeVenta, ItenDeVentaRelations, Producto, CarritoDeCompras} from '../models';
import {ProductoRepository} from './producto.repository';
import {CarritoDeComprasRepository} from './carrito-de-compras.repository';

export class ItenDeVentaRepository extends DefaultCrudRepository<
  ItenDeVenta,
  typeof ItenDeVenta.prototype.id,
  ItenDeVentaRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof ItenDeVenta.prototype.id>;

  public readonly carritoDeCompras: BelongsToAccessor<CarritoDeCompras, typeof ItenDeVenta.prototype.id>;

  constructor(
    @inject('datasources.tienda') dataSource: TiendaDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('CarritoDeComprasRepository') protected carritoDeComprasRepositoryGetter: Getter<CarritoDeComprasRepository>,
  ) {
    super(ItenDeVenta, dataSource);
    this.carritoDeCompras = this.createBelongsToAccessorFor('carritoDeCompras', carritoDeComprasRepositoryGetter,);
    this.registerInclusionResolver('carritoDeCompras', this.carritoDeCompras.inclusionResolver);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
