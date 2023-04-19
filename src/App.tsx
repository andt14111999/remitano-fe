import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/global.css';
import CustomLoader from 'components/CustomLoader';
import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';
import axios from 'axios';
import { useAppDispatch } from 'stores/hooks';
import { uiActions } from 'stores/uiSlice';
import parseJwt from 'utils/ParseJwt';
import setAxiosWithBearer from 'utils/SetAxiosWithBearer';
import { userActions } from 'stores/userSlice';

const REMOVE_ACCESS_TOKEN = '';

function App() {
  const content = useRoutes(routes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken', accessToken?.toString());
    if (accessToken) {
      try {
        const values = parseJwt(accessToken);
        console.log(values);
        if (Date.now() < values.exp * 1000) {
          setAxiosWithBearer(accessToken);
          dispatch(
            userActions.updateUser({
              isLoggedIn: true,
              email: values.email,
            })
          );
          console.log('updateIsLoggedIn');
        } else {
          localStorage.removeItem('accessToken');
          dispatch(
            userActions.updateUser({
              isLoggedIn: false,
              email: '',
            })
          );
          setAxiosWithBearer(REMOVE_ACCESS_TOKEN);
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setAxiosWithBearer(REMOVE_ACCESS_TOKEN);
      }
    }
  }, [dispatch]);

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
    >
      {content}
      <CustomLoader />
    </SnackbarProvider>
  );
}

export default App;
