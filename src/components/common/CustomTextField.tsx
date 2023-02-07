import {
  FormControl,
  InputLabel,
  FormControlProps,
  TextFieldProps,
  TextField,
  SxProps,
} from '@mui/material';

interface CustomTextFieldProps {
  formProps?: FormControlProps;
  inputProps?: TextFieldProps;
  helperText?: string | boolean;
  label?: string;
  sx?: SxProps;
  isRequired?: boolean;
}

const CustomTextField = ({
  formProps,
  inputProps,
  helperText,
  label,
  sx,
}: CustomTextFieldProps) => {
  return (
    <FormControl variant="standard" fullWidth {...formProps} sx={sx}>
      <InputLabel
        sx={{
          fontWeight: 'bold',
          marginTop: '-16px',
          color: '#000 !important',
        }}
      >
        {label}
      </InputLabel>
      <TextField
        {...inputProps}
        sx={{
          mt: '32px',
        }}
        fullWidth
        helperText={helperText}
      />
    </FormControl>
  );
};

export default CustomTextField;
