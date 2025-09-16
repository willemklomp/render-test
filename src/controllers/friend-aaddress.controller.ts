import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Friend,
  Aaddress,
} from '../models';
import {FriendRepository} from '../repositories';

export class FriendAaddressController {
  constructor(
    @repository(FriendRepository) protected friendRepository: FriendRepository,
  ) { }

  @get('/friends/{id}/aaddresses', {
    responses: {
      '200': {
        description: 'Array of Friend has many Aaddress',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aaddress)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Aaddress>,
  ): Promise<Aaddress[]> {
    return this.friendRepository.aaddresses(id).find(filter);
  }

  @post('/friends/{id}/aaddresses', {
    responses: {
      '200': {
        description: 'Friend model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aaddress)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Friend.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aaddress, {
            title: 'NewAaddressInFriend',
            exclude: ['id'],
            optional: ['friendId']
          }),
        },
      },
    }) aaddress: Omit<Aaddress, 'id'>,
  ): Promise<Aaddress> {
    return this.friendRepository.aaddresses(id).create(aaddress);
  }

  @patch('/friends/{id}/aaddresses', {
    responses: {
      '200': {
        description: 'Friend.Aaddress PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aaddress, {partial: true}),
        },
      },
    })
    aaddress: Partial<Aaddress>,
    @param.query.object('where', getWhereSchemaFor(Aaddress)) where?: Where<Aaddress>,
  ): Promise<Count> {
    return this.friendRepository.aaddresses(id).patch(aaddress, where);
  }

  @del('/friends/{id}/aaddresses', {
    responses: {
      '200': {
        description: 'Friend.Aaddress DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Aaddress)) where?: Where<Aaddress>,
  ): Promise<Count> {
    return this.friendRepository.aaddresses(id).delete(where);
  }
}
