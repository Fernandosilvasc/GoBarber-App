/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import { Container } from './styles';

interface User {
  name: string;
}

const UseAvatar: React.FC<User> = ({ name }: User) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userNameFormatted = name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[1].charAt(0).toUpperCase();

    setUsername(userNameFormatted);
  }, [name]);

  return (
    <Container>
      <p>{username}</p>
    </Container>
  );
};

export default UseAvatar;
