import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Aaddress, AaddressRelations, Friend} from '../models';
import {FriendRepository} from './friend.repository';

export class AaddressRepository extends DefaultCrudRepository<
  Aaddress,
  typeof Aaddress.prototype.id,
  AaddressRelations
> {

  public readonly friend: BelongsToAccessor<Friend, typeof Aaddress.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FriendRepository') protected friendRepositoryGetter: Getter<FriendRepository>,
  ) {
    super(Aaddress, dataSource);
    this.friend = this.createBelongsToAccessorFor('friend', friendRepositoryGetter,);
    this.registerInclusionResolver('friend', this.friend.inclusionResolver);
  }
}
