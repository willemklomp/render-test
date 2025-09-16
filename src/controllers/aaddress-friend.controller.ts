import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aaddress,
  Friend,
} from '../models';
import {AaddressRepository} from '../repositories';

export class AaddressFriendController {
  constructor(
    @repository(AaddressRepository)
    public aaddressRepository: AaddressRepository,
  ) { }

  @get('/aaddresses/{id}/friend', {
    responses: {
      '200': {
        description: 'Friend belonging to Aaddress',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Friend),
          },
        },
      },
    },
  })
  async getFriend(
    @param.path.number('id') id: typeof Aaddress.prototype.id,
  ): Promise<Friend> {
    return this.aaddressRepository.friend(id);
  }
}
