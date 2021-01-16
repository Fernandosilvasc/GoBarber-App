import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import isAuth from "@modules/users/infra/http/middlewares/isAuth";

const appointmentsRouter = Router();

appointmentsRouter.use(isAuth);

// appointmentsRouter.get("/", async (request, response) => {
  //   const appointments = await appointmentsRepository.find();
  //   return response.json(appointments);
  // });

  appointmentsRouter.post("/", async (request, response) => {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

  const appointmentRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
