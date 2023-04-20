import { Box, Container, TextField, Typography } from '@mui/material';
import APIs from 'apis';
import axios from 'axios';
import CustomButton from 'components/CustomButton';
import { useFormik } from 'formik';
import { useEnqueueSnackbar } from 'hooks/useEnqueueSnackbar';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { userActions } from 'stores/userSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  videoURL: Yup.string().required('Video URL is required'),
});

const Share = () => {
  const enqueueSnackbar = useEnqueueSnackbar();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      videoURL: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        videoURL: values.videoURL,
      };
      axios
        .post(APIs.videos, data)
        .then((res) => {
          enqueueSnackbar('Share successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data) {
            enqueueSnackbar(`Share failed: ${err.response.data}`, {
              variant: 'error',
            });
          } else {
            enqueueSnackbar(`Share failed: ${err}`, { variant: 'error' });
          }
        });
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

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
          Share a Youtube Video
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          className="w-full md:min-w-[35rem]"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="videoURL"
            label="Youtube URL"
            name="videoURL"
            autoComplete="videoURL"
            autoFocus
            value={formik.values.videoURL}
            onChange={formik.handleChange}
            error={formik.touched.videoURL && Boolean(formik.errors.videoURL)}
            helperText={formik.touched.videoURL && formik.errors.videoURL}
          />
          <CustomButton
            className="mt-6 mb-4 w-full custom-button-shadow"
            type="submit"
          >
            Share
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Share;
