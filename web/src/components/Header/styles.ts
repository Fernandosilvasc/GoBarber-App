import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  padding: 32px 0 0 0;
  background: #28262e;
`;

export const NavTab = styled.nav`
  max-width: 1120px;
  margin: 30px auto;
  display: flex;
  border-radius: 5px 5px 0 0;
  background-color: #3e3b47;
  border-bottom: 1px solid ${shade(0.2, '#ff9000')};

  a {
    text-decoration: none;
    margin-top: 10px;
    padding: 10px 10px 5px 10px;
    color: #fff;
    font-weight: bold;
  }

  a:hover {
    color: ${shade(0.2, '#fff')};
  }

  .isActiveLink {
    border-bottom: 2px solid #ff9000;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
    }
    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
