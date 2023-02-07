import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { FormControl } from '@mui/material';
import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import PrimaryButton from 'components/common/PrimaryButton';
import { Formik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn } from 'redux/features/auth/authSlice';
import { AppDispatch } from 'redux/store';
import * as yup from 'yup';

interface ICredentials {
  email: string;
  password: string;
  submit: string | null;
}

const initialValues: ICredentials = {
  email: '',
  password: '',
  submit: null,
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleFormSubmit = async (
    values: ICredentials,
    { setErrors, setSubmitting }: FormikHelpers<ICredentials>
  ) => {
    dispatch(signIn({ email: values.email, password: values.password })).then((response) => {
      switch (response.type) {
        case 'auth/signIn/fulfilled':
          navigate(from, { replace: true });
          break;
        case 'auth/signIn/rejected':
          if (response.payload === 404 || response.payload === 401) {
            setErrors({
              submit: 'Sai tài khoản hoặc mật khẩu',
            });
          }
          break;
        default:
          break;
      }
      setSubmitting(false);
    });
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" mb="12px" fontWeight="bold">
              Đăng nhập với Email
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Email không hợp lệ')
            .max(255)
            .required('Không được để trống trường này'),
          password: yup.string().max(255).required('Không được để trống trường này'),
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{
                marginTop: '20px',
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">Mật khẩu</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type="password"
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Mật khẩu"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer', ml: 'auto' }}
              >
                Quên mật khẩu
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 0 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <PrimaryButton
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: '100%',
                }}
              >
                ĐĂNG NHẬP
              </PrimaryButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
