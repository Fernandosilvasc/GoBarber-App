import AppError from "@shared/errors/AppError";

import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "123123123",
    })

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123123");

  });

  it('Should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointmentDate = new Date(2021, 0, 20, 7 );

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "123123123",
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: "123123123",
    })).rejects.toBeInstanceOf(AppError);

  });
});