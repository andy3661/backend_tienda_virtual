import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TiendaDataSource} from '../datasources';
import {DocumentoVenta, DocumentoVentaRelations, CarritoDeCompras} from '../models';
import {CarritoDeComprasRepository} from './carrito-de-compras.repository';

export class DocumentoVentaRepository extends DefaultCrudRepository<
  DocumentoVenta,
  typeof DocumentoVenta.prototype.id,
  DocumentoVentaRelations
> {

  public readonly carritoDeCompras: BelongsToAccessor<CarritoDeCompras, typeof DocumentoVenta.prototype.id>;

  constructor(
    @inject('datasources.tienda') dataSource: TiendaDataSource, @repository.getter('CarritoDeComprasRepository') protected carritoDeComprasRepositoryGetter: Getter<CarritoDeComprasRepository>,
  ) {
    super(DocumentoVenta, dataSource);
    this.carritoDeCompras = this.createBelongsToAccessorFor('carritoDeCompras', carritoDeComprasRepositoryGetter,);
    this.registerInclusionResolver('carritoDeCompras', this.carritoDeCompras.inclusionResolver);
  }
}
