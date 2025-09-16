import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Friend, FriendRelations, Aaddress} from '../models';
import {AaddressRepository} from './aaddress.repository';

export class FriendRepository extends DefaultCrudRepository<
  Friend,
  typeof Friend.prototype.id,
  FriendRelations
> {

  public readonly aaddresses: HasManyRepositoryFactory<Aaddress, typeof Friend.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AaddressRepository') protected aaddressRepositoryGetter: Getter<AaddressRepository>,
  ) {
    super(Friend, dataSource);
    this.aaddresses = this.createHasManyRepositoryFactoryFor('aaddresses', aaddressRepositoryGetter,);
    this.registerInclusionResolver('aaddresses', this.aaddresses.inclusionResolver);
  }
}
