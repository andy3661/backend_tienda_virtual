import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {TiendaDataSource} from '../datasources';
import {CarritoDeCompras, CarritoDeComprasRelations, ItenDeVenta, Cliente, DocumentoVenta} from '../models';
import {ItenDeVentaRepository} from './iten-de-venta.repository';
import {ClienteRepository} from './cliente.repository';
import {DocumentoVentaRepository} from './documento-venta.repository';

export class CarritoDeComprasRepository extends DefaultCrudRepository<
  CarritoDeCompras,
  typeof CarritoDeCompras.prototype.id,
  CarritoDeComprasRelations
> {

  public readonly itenDeVentas: HasManyRepositoryFactory<ItenDeVenta, typeof CarritoDeCompras.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof CarritoDeCompras.prototype.id>;

  public readonly documentoVentas: HasManyRepositoryFactory<DocumentoVenta, typeof CarritoDeCompras.prototype.id>;

  constructor(
    @inject('datasources.tienda') dataSource: TiendaDataSource, @repository.getter('ItenDeVentaRepository') protected itenDeVentaRepositoryGetter: Getter<ItenDeVentaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DocumentoVentaRepository') protected documentoVentaRepositoryGetter: Getter<DocumentoVentaRepository>,
  ) {
    super(CarritoDeCompras, dataSource);
    this.documentoVentas = this.createHasManyRepositoryFactoryFor('documentoVentas', documentoVentaRepositoryGetter,);
    this.registerInclusionResolver('documentoVentas', this.documentoVentas.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.itenDeVentas = this.createHasManyRepositoryFactoryFor('itenDeVentas', itenDeVentaRepositoryGetter,);
    this.registerInclusionResolver('itenDeVentas', this.itenDeVentas.inclusionResolver);
  }
}
