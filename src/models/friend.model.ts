import {Entity, model, property, hasMany} from '@loopback/repository';
import {Aaddress} from './aaddress.model';

@model()
export class Friend extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @hasMany(() => Aaddress)
  aaddresses: Aaddress[];

  constructor(data?: Partial<Friend>) {
    super(data);
  }
}

export interface FriendRelations {
  // describe navigational properties here
}

export type FriendWithRelations = Friend & FriendRelations;
