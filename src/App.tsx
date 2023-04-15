import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/global.css'
import CustomLoader from 'components/CustomLoader';
import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';

function App() {
    const content = useRoutes(routes);

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      // content={(key, message) => <CustomSnackbar id={key} message={message} />}
      // action={(key) => (
      //   <CustomSnackbarClose id={key} />
      // )}
    >
      {content}
      <CustomLoader />
    </SnackbarProvider>
  );
}

export default App;
