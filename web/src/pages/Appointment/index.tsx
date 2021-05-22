/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiCalendar } from 'react-icons/fi';

import { format } from 'date-fns';
import Header from '../../components/Header';
import Calendar from '../../components/Calendar';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  ProviderContainer,
  ProviderCard,
  ProviderInfo,
  ProviderMeta,
  CreateAppointment,
  DataPickerContainer,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const Appointment: React.FC = () => {
  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);

  const [selectedProvider, setSelectedProvider] = useState('');

  const minimumDate = useMemo(() => {
    const today = new Date();

    // if (today.getHours() >= 17) {
    //   return new Date(today.setDate(today.getDate() + 1));
    // }

    return today;
  }, []);

  const [selectedDate, setSelectedDate] = useState(minimumDate);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
      setSelectedProvider(response.data[0].id);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const morningAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour < 12)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'hh:00'),
        })),
    [availability],
  );

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });
      addToast({
        type: 'success',
        title: 'Appointment has been created with success!',
        description: 'We look forward to welcoming you to Gobarber!',
      });

      setSelectedHour(0);
      // navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error to book the appointment!',
        description:
          'An error has occurred while booking the appointment, please try again!',
      });
    }
  }, [addToast, selectedDate, selectedHour, selectedProvider]);

  const afternoonAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour >= 12)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'hh:00'),
        })),
    [availability],
  );

  return (
    <Container>
      <Header data={{ user, signOut }} />
      <Content>
        <h1>Hairdressers</h1>
        <ProviderContainer>
          {providers.map(provider => (
            <ProviderCard
              key={provider.id}
              active={provider.id === selectedProvider}
              onClick={() => handleSelectProvider(provider.id)}
            >
              <img src={provider.avatar_url} alt={provider.name} />
              <ProviderInfo>
                <h2>{provider.name}</h2>
                <ProviderMeta>
                  <FiCalendar size={14} />
                  <p>Monday to Friday</p>
                </ProviderMeta>
                <ProviderMeta>
                  <FiCalendar size={14} />
                  <p>8am to 6pm</p>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderCard>
          ))}
        </ProviderContainer>
      </Content>

      <CreateAppointment>
        <h3>
          Create an Appointment
          <em> - select one of the available hairdressers !</em>
        </h3>
        <DataPickerContainer>
          <Calendar data={{ userId: user.id, selectedDate, setSelectedDate }} />

          <Schedule>
            <h3>Chose a time</h3>
            <Section>
              <SectionTitle>AM</SectionTitle>
              <SectionContent>
                {morningAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <Hour
                      // enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                      onClick={() => handleSelectHour(hour)}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>PM</SectionTitle>

              <SectionContent>
                {afternoonAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <Hour
                      // enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                      onClick={() => handleSelectHour(hour)}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>

            <CreateAppointmentButton onClick={handleCreateAppointment}>
              <CreateAppointmentButtonText>
                Book appointment
              </CreateAppointmentButtonText>
            </CreateAppointmentButton>
          </Schedule>
        </DataPickerContainer>
      </CreateAppointment>
    </Container>
  );
};

export default Appointment;
