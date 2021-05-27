/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect, useMemo } from 'react';
import { FiClock } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';

import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Header from '../../components/Header';
import Calendar from '../../components/Calendar';
import UserAvatar from '../../components/UserAvatar';

import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  UserDisplay,
} from './styles';

interface AppointmentData {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  useEffect(() => {
    api
      .get<AppointmentData[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'hh:mm'),
        }));

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const selectedDateAsText = useMemo(
    () => format(selectedDate, 'MMMM dd', {}),
    [selectedDate],
  );

  const selectedWeekDay = useMemo(() => format(selectedDate, 'cccc'), [
    selectedDate,
  ]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <Container>
      <Header data={{ signOut, user }} />
      <Content>
        <Schedule>
          <h1>Scheduled times</h1>
          <p>
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedWeekDay}</span>
            <span>{selectedDateAsText}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Next Appointment</strong>
              <div>
                {nextAppointment.user.avatar_url && (
                  <img
                    src={nextAppointment.user.avatar_url}
                    alt={nextAppointment.user.name}
                  />
                )}
                {!nextAppointment.user.avatar_url && (
                  <UserAvatar name={nextAppointment.user.name} />
                )}
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>AM</strong>

            {morningAppointments.length === 0 && (
              <p>No appointment for this time.</p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <UserDisplay>
                  {appointment.user.avatar_url && (
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />
                  )}
                  {!appointment.user.avatar_url && (
                    <UserAvatar name={appointment.user.name} />
                  )}

                  <strong>{appointment.user.name}</strong>
                </UserDisplay>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>PM</strong>

            {afternoonAppointments.length === 0 && (
              <p>No appointment for this time.</p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <UserDisplay>
                  {appointment.user.avatar_url && (
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />
                  )}
                  {!appointment.user.avatar_url && (
                    <UserAvatar name={appointment.user.name} />
                  )}

                  <strong>{appointment.user.name}</strong>
                </UserDisplay>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calendar data={{ userId: user.id, selectedDate, setSelectedDate }} />
      </Content>
    </Container>
  );
};

export default Dashboard;
