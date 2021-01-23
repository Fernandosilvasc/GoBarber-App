/* eslint-disable import/no-unresolved */
import { Router } from 'express';

import isAuth from '@modules/users/infra/http/middlewares/isAuth';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(isAuth);

providersRouter.get('/', providersController.index);

export default providersRouter;
