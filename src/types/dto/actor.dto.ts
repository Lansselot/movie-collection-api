import { ActorSortField } from '../../models/enums/actor-sort-format.enum';
import { SortOrder } from '../../models/enums/sort-order.enum';

export type CreateActorDTO = {
  name: string;
};

export type UpdateActorDTO = Partial<CreateActorDTO>;

export type ActorFiltersDTO = {
  name?: string;
  sort?: ActorSortField;
  order?: SortOrder;
  limit?: number;
  offset?: number;
};
