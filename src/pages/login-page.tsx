import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

import { AuthRequest } from '../types/interfaces/api/requests/auth';
import { useAuth } from '../hooks/use-auth';
import { loginFormSchema } from '../validation-schemas/login-form';
import { loginFormInitialValues } from '../fixtures/login-form';
import { useEffect } from 'react';
import { PointOfSale } from '@mui/icons-material';
import { useError } from '../hooks/use-error';
import { errorMessage } from '../helpers/error';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, errorExtactor] = useError();

  useEffect(() => {
    if (Object.keys(user).length) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (values: AuthRequest) => {
    const response = await login(values);

    if (response.error) {
      return errorExtactor(response);
    }

    if (Object.keys(response).length) {
      navigate('/');
    }
  };

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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PointOfSale />
        </Avatar>
        <Typography component="h1" variant="h5">
          Web POS
        </Typography>
        <Formik
          initialValues={loginFormInitialValues}
          validationSchema={loginFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
              <small className="text-red-500">
                { errorMessage<AuthRequest>('username', touched, errors, error) }
              </small>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <small className="text-red-500">
                { errorMessage<AuthRequest>('password', touched, errors, error) }
              </small>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default LoginPage;
