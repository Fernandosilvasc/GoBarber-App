/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  margin: 0 auto;

  h1 {
    margin-top: 24px;
    font-size: 36px;
  }
`;

export const ProviderContainer = styled.div`
  display: flex;
  align-items: center;
  background: inherit;
  border-radius: 10px;
`;

export const ProviderInfo = styled.div`
  flex: 1;
  margin-left: 20px;

  h2 {
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #f4ede8;
  }
`;

export const ProviderMeta = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  p {
    margin-left: 8px;
    color: #999591;
    font-family: 'RobotoSlab-Regular';
  }
`;

interface ProviderCardProps {
  active: boolean;
}

export const ProviderCard = styled.button<ProviderCardProps>`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #3e3b47;
  border: none;
  border-radius: 10px;
  margin-top: 16px;
  margin-right: 16px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 36px;
  }

  svg {
    color: #ff9000;
  }

  div {
    border-color:#ff9000
  }


  ${(props: { active: boolean }) => props.active
    && css`
      background: #ff9000;
      h2,
      svg,
      p {
        color: #3e3b47;
      }

      h2 {
        font-weight: bold;
      }

      div {
        border-color:#3e3b47
      }
    `}

  &:hover {
    background: ${shade(0.2, '#ff9000')};

    h2,
    svg,
    p {
      color: #3e3b47;
    }

    h2 {
      font-weight: bold;
    }

    div {
      border-color:#3e3b47
    }
  }
`;

export const CreateAppointment = styled.div`
  max-width: 1120px;
  margin: 40px auto;

  h3 {
    font-size: 1.5rem;
    margin: 40px 0;

    em {
      font-size: 1.2rem;
      color: #999591;
    }
  }
`;

export const DataPickerContainer = styled.div`
  display: flex;
`;

export const Schedule = styled.div`

  h3 {
    font-size: 18px;
    color: #999591;
    font-family: 'RobotoSlab-Regular';
    margin: 0 24px 30px;
  }
`;

export const Section = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`;

export const SectionTitle = styled.h4`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.div`
  display: flex;
`;

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Hour = styled.button<HourProps>`
  padding: 12px;
  background: ${(props) => (props.selected ? '#FF9000' : '#3e3b47')};
  border: none;
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.p<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;

export const CreateAppointmentButton = styled.button`
  display: flex;
  background: #ff9000;
  border: none;
  border-radius: 10px;
  padding: 20px;
  height: 50px;
  margin: 0 24px 24px;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;

export const CreateAppointmentButtonText = styled.p`
  color: #312e38;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;
