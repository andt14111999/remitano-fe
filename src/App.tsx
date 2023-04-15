import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/global.css'
import CustomLoader from 'components/CustomLoader';
import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';
import axios from 'axios';
import { useAppDispatch } from 'stores/hooks';
import { uiActions } from 'stores/uiSlice';

function App() {
    const content = useRoutes(routes);
      const dispatch = useAppDispatch();


      useEffect(() => {
        axios.interceptors.request.use(
          (request) => {
            // Edit request config
            dispatch(uiActions.updateIsLoading(true));
            return request;
          },
          (err) => {
            console.log(err);
            dispatch(uiActions.updateIsLoading(false));
            return Promise.reject(err);
          }
        );

        axios.interceptors.response.use(
          (response) => {
            console.log(response.data);
            dispatch(uiActions.updateIsLoading(false));
            return response;
          },
          (err) => {
            console.log(err);
            dispatch(uiActions.updateIsLoading(false));
            return Promise.reject(err);
          }
        );
      }, [dispatch]);


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
