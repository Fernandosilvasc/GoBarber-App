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

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
