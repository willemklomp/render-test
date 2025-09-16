import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Friend} from './friend.model';

@model()
export class Aaddress extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  postcode: string;

  @property({
    type: 'string',
    required: true,
  })
  street: string;

  @property({
    type: 'string',
    required: true,
  })
  house_number: string;

  @belongsTo(() => Friend)
  friendId: number;

  constructor(data?: Partial<Aaddress>) {
    super(data);
  }
}

export interface AaddressRelations {
  // describe navigational properties here
}

export type AaddressWithRelations = Aaddress & AaddressRelations;
