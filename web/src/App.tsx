import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index';
// import SignUp from './pages/SignUp/index';
import Toast from './components/Toast/index';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <Toast />
    <GlobalStyle />
  </>
);

export default App;
