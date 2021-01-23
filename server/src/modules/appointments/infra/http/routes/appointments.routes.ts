/* eslint-disable import/no-unresolved */
import { Router } from 'express';

import isAuth from '@modules/users/infra/http/middlewares/isAuth';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(isAuth);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
