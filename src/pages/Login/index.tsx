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
import { useEnqueueSnackbar } from 'hooks/useEnqueueSnackbar';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'stores/hooks';
import * as Yup from 'yup';

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

const Login = () => {
  const enqueueSnackbar = useEnqueueSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

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
        .post(APIs.login, data)
        .then((res) => {
          enqueueSnackbar('Register successfully', { variant: 'success' });
          const token = res.data;
          if (token) {
            localStorage.setItem('accessToken', token);
          }
          navigate('/');
        })
        .catch((err) => {
          enqueueSnackbar('Register failed', { variant: 'error' });
        });
    },
  });

  // CHECK REDIRECT SEARCH PARAMS
  useEffect(() => {
    if (isLoggedIn && isInitialized) navigate('/');
    setIsInitialized(true);
  }, [isInitialized, isLoggedIn, navigate])

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
          Sign in
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
            Sign In
          </CustomButton>
          <Grid container>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
