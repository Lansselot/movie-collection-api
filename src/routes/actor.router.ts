import { Router } from 'express';
import {
  actorIdParamValidator,
  actorQueryValidator,
  createActorValidator,
  patchActorValidation,
  putActorValidation,
} from '../validators/actor.validator';
import { validate } from '../middleware/validate.middleware';
import { actorController } from '../controllers';

const router = Router();

router.get('/', actorQueryValidator, validate, actorController.getActors);
router.post('/', createActorValidator, validate, actorController.createActor);
router.get(
  '/:actorId',
  actorIdParamValidator,
  validate,
  actorController.getActorById
);
router.put(
  '/:actorId',
  actorIdParamValidator,
  putActorValidation,
  validate,
  actorController.updateActor
);
router.patch(
  '/:actorId',
  actorIdParamValidator,
  patchActorValidation,
  validate,
  actorController.updateActor
);
router.delete(
  '/:actorId',
  actorIdParamValidator,
  validate,
  actorController.deleteActor
);

export default router;
