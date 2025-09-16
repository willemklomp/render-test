import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Aaddress} from '../models';
import {AaddressRepository} from '../repositories';

export class AdressController {
  constructor(
    @repository(AaddressRepository)
    public aaddressRepository : AaddressRepository,
  ) {}

  @post('/aaddresses')
  @response(200, {
    description: 'Aaddress model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aaddress)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aaddress, {
            title: 'NewAaddress',
            exclude: ['id'],
          }),
        },
      },
    })
    aaddress: Omit<Aaddress, 'id'>,
  ): Promise<Aaddress> {
    return this.aaddressRepository.create(aaddress);
  }

  @get('/aaddresses/count')
  @response(200, {
    description: 'Aaddress model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aaddress) where?: Where<Aaddress>,
  ): Promise<Count> {
    return this.aaddressRepository.count(where);
  }

  @get('/aaddresses')
  @response(200, {
    description: 'Array of Aaddress model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aaddress, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aaddress) filter?: Filter<Aaddress>,
  ): Promise<Aaddress[]> {
    return this.aaddressRepository.find(filter);
  }

  @patch('/aaddresses')
  @response(200, {
    description: 'Aaddress PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aaddress, {partial: true}),
        },
      },
    })
    aaddress: Aaddress,
    @param.where(Aaddress) where?: Where<Aaddress>,
  ): Promise<Count> {
    return this.aaddressRepository.updateAll(aaddress, where);
  }

  @get('/aaddresses/{id}')
  @response(200, {
    description: 'Aaddress model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aaddress, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Aaddress, {exclude: 'where'}) filter?: FilterExcludingWhere<Aaddress>
  ): Promise<Aaddress> {
    return this.aaddressRepository.findById(id, filter);
  }

  @patch('/aaddresses/{id}')
  @response(204, {
    description: 'Aaddress PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aaddress, {partial: true}),
        },
      },
    })
    aaddress: Aaddress,
  ): Promise<void> {
    await this.aaddressRepository.updateById(id, aaddress);
  }

  @put('/aaddresses/{id}')
  @response(204, {
    description: 'Aaddress PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() aaddress: Aaddress,
  ): Promise<void> {
    await this.aaddressRepository.replaceById(id, aaddress);
  }

  @del('/aaddresses/{id}')
  @response(204, {
    description: 'Aaddress DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.aaddressRepository.deleteById(id);
  }
}
