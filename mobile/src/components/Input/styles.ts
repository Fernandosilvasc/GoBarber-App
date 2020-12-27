/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  border-width: 2px;
  border-color: #232129;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.hasError && css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused && css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #ffffff;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
