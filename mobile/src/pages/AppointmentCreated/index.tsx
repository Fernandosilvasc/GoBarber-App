import React, { useMemo, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(
      params.date,
      "EEEE, MMMM dd ',' yyyy 'at' hh:mm aaaa",
    );
  }, [params.date]);

  const handleOk = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Dashboard',
        },
      ],
    });
  }, []);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Appointment created successfully!</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOk}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
