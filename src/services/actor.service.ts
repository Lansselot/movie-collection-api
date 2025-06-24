import Boom from '@hapi/boom';
import { Actor } from '../db/models/actor.model';
import {
  ActorFiltersDTO,
  CreateActorDTO,
  UpdateActorDTO,
} from '../types/dto/actor.dto';
import { ActorSortField } from '../types/enums/actor-sort-format.enum';
import { SortOrder } from '../types/enums/sort-order.enum';
import { Op, Transaction } from 'sequelize';

export class ActorService {
  async createActor({ name }: CreateActorDTO): Promise<Actor> {
    return this.getOrCreateByName(name);
  }

  async deleteActorById(actorId: string): Promise<{ success: true }> {
    const rowsDeleted = await Actor.destroy({ where: { id: actorId } });
    if (!rowsDeleted) throw Boom.notFound('Actor not found');

    return { success: true };
  }

  async updateActorById(actorId: string, data: UpdateActorDTO): Promise<Actor> {
    const actor = await Actor.findByPk(actorId);
    if (!actor) throw Boom.notFound('Actor not found');

    await actor.update(data);
    return actor;
  }

  async getActors(filters: ActorFiltersDTO): Promise<Actor[]> {
    const {
      name,
      sort = ActorSortField.ID,
      order = SortOrder.ASC,
      limit = 100,
      offset = 0,
    } = filters;

    const where: any = {};

    if (name) {
      where.name = { [Op.substring]: `${name}%` };
    }

    return Actor.findAll({ where, order: [[sort, order]], limit, offset });
  }

  async getActorById(actorId: string): Promise<Actor> {
    const actor = await Actor.findByPk(actorId);
    if (!actor) throw Boom.notFound('Actor not found');

    return actor;
  }

  async getOrCreateByName(name: string, t?: Transaction): Promise<Actor> {
    let actor = await Actor.findOne({ where: { name } });
    if (!actor) {
      actor = await Actor.create({ name }, { transaction: t });
    }

    return actor;
  }
}
