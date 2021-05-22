/* eslint-disable object-curly-newline */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';

import { Container, HeaderContent, Profile, NavTab } from './styles';

import LogoImg from '../../assets/logo.svg';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface HeaderProps {
  data: {
    signOut(): void;
    user: User;
  };
}

const Header: React.FC<HeaderProps> = ({ data }: HeaderProps) => {
  const { user, signOut } = data;

  return (
    <Container>
      <HeaderContent>
        <img src={LogoImg} alt="GoBarber" />

        <Profile>
          <img src={user.avatar_url} alt={user.name} />
          <div>
            <span>Welcome,</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>

      <NavTab>
        <NavLink to="dashboard" activeClassName="isActiveLink">
          Dashboard
        </NavLink>
        <NavLink to="appointment" activeClassName="isActiveLink">
          Appointment
        </NavLink>
      </NavTab>
    </Container>
  );
};

export default Header;
