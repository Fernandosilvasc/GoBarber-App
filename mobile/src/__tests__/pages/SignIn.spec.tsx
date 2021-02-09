import React from 'react';
import { render , waitFor } from 'react-native-testing-library';

import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SignIn page', () => {
  it('should contains email/password inputs', async () => {
    const { getByPlaceholder } = render(<SignIn />);

    await waitFor(() => {
      expect(getByPlaceholder('E-mail')).toBeTruthy();
    })

    await waitFor(() => {
      expect(getByPlaceholder('Password')).toBeTruthy();
    })
  });
});
