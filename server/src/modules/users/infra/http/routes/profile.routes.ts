/* eslint-disable import/no-unresolved */
import { Router } from 'express';

import isAuth from '@modules/users/infra/http/middlewares/isAuth';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuth);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
