import Boom from '@hapi/boom';
import { Actor } from '../models/actor.model';
import {
  ActorFiltersDTO,
  CreateActorDTO,
  UpdateActorDTO,
} from '../types/dto/actor.dto';
import { ActorSortField } from '../models/enums/actor-sort-format.enum';
import { SortOrder } from '../models/enums/sort-order.enum';
import { Op } from 'sequelize';

export class ActorService {
  public async createActor(data: CreateActorDTO): Promise<Actor> {
    return Actor.create(data);
  }

  public async deleteActorById(actorId: string): Promise<{ success: true }> {
    const rowsDeleted = await Actor.destroy({ where: { id: actorId } });
    if (!rowsDeleted) throw Boom.notFound('Actor not found');

    return { success: true };
  }

  public async updateActorById(
    actorId: string,
    data: UpdateActorDTO
  ): Promise<Actor> {
    const actor = await Actor.findByPk(actorId);
    if (!actor) throw Boom.notFound('Actor not found');

    await actor.update(data);
    return actor;
  }

  public async getActors(filters: ActorFiltersDTO): Promise<Actor[]> {
    const {
      name,
      sort = ActorSortField.ID,
      order = SortOrder.ASC,
      limit = 10,
      offset = 0,
    } = filters;

    const where: any = {};

    if (name) {
      where.name = { [Op.substring]: `${name}%` };
    }

    return Actor.findAll({ where, order: [[sort, order]], limit, offset });
  }

  public async getActorById(actorId: string): Promise<Actor> {
    const actor = await Actor.findByPk(actorId);
    if (!actor) throw Boom.notFound('Actor not found');

    return actor;
  }
}
