import { Request, Response, NextFunction } from 'express';
import { actorService } from '../services';
import {
  ActorFiltersDTO,
  CreateActorDTO,
  UpdateActorDTO,
} from '../types/dto/actor.dto';
import { ActorSortField } from '../types/enums/actor-sort-format.enum';
import { SortOrder } from '../types/enums/sort-order.enum';

export class ActorController {
  async createActor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: CreateActorDTO = req.body;

      const newActor = await actorService.createActor(data);

      res.status(201).json(newActor);
    } catch (error) {
      next(error);
    }
  }

  async deleteActor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const actorId = req.params.actorId;

      await actorService.deleteActorById(actorId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async updateActor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const actorId = req.params.actorId;
      const data: UpdateActorDTO = req.body;

      const updatedActor = await actorService.updateActorById(actorId, data);

      res.json(updatedActor);
    } catch (error) {
      next(error);
    }
  }

  async getActors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, sort, order, limit, offset } = req.query;

      const filters: ActorFiltersDTO = {
        name: name as string,
        sort: sort as ActorSortField,
        order: order as SortOrder,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };

      const actors = await actorService.getActors(filters);

      res.json(actors);
    } catch (error) {
      next(error);
    }
  }

  async getActorById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const actorId = req.params.actorId;

      const actor = await actorService.getActorById(actorId);

      res.json(actor);
    } catch (error) {
      next(error);
    }
  }
}
