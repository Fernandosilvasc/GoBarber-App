import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import isAuth from "../middlewares/isAuth";

const appointmentsRouter = Router();

appointmentsRouter.use(isAuth);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
