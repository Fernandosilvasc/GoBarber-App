/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import React, { useState, useEffect, useCallback } from 'react';
import { FiCalendar } from 'react-icons/fi';

import Header from '../../components/Header';
import Calendar from '../../components/Calendar';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Content,
  ProviderContainer,
  ProviderCard,
  ProviderInfo,
  ProviderMeta,
  CreateAppointment,
  // Calendar,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Appointment: React.FC = () => {
  const { user, signOut } = useAuth();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
      setSelectedProvider(response.data[0].id);
    });
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

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
        <Calendar data={{ userId: user.id, selectedDate, setSelectedDate }} />
      </CreateAppointment>
    </Container>
  );
};

export default Appointment;
