import { Copyright } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import APIs from 'apis';
import axios from 'axios';
import CustomButton from 'components/CustomButton';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useEnqueueSnackbar } from '../../hooks/useEnqueueSnackbar';
import { useAppDispatch } from 'stores/hooks';
import { userActions } from 'stores/userSlice';
import setAxiosWithBearer from 'utils/SetAxiosWithBearer';
import parseJwt from 'utils/ParseJwt';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .max(20, 'Password should be of maximum 20 characters length')
    .matches(/^[a-zA-Z0-9]{6,20}$/, 'Character or Number only')
    .required('Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const enqueueSnackbar = useEnqueueSnackbar();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      axios
        .post(APIs.register, data)
        .then((res) => {
          enqueueSnackbar('Register successfully', { variant: 'success' });
          const token = res.data;
          if (token) {
            localStorage.setItem('accessToken', token);
          }
          const values = parseJwt(token);
          dispatch(
            userActions.updateUser({
              isLoggedIn: true,
              email: values.email,
            })
          );
          setAxiosWithBearer(token);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data) {
            enqueueSnackbar(`Register failed: ${err.response.data}`, {
              variant: 'error',
            });
          } else {
            enqueueSnackbar(`Register failed: ${err.message}`, {
              variant: 'error',
            });
          }
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <CustomButton
            className="mt-6 mb-4 w-full custom-button-shadow"
            type="submit"
          >
            Sign Up
          </CustomButton>
          <Grid container>
            <Grid item>
              <Link to="/login">{'Already have an account? Sign In'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
