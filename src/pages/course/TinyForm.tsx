import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/system';
import AlertDialog from './AlertDialog';
import { useState } from 'react';

const validationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập trường này'),
});

export interface IValues {
  name: string;
}

interface ITinyForm {
  handleFormSubmit: (values: IValues) => Promise<void>;
  title?: string;
  data?: any;
  isCreate?: boolean;
  handleDelete?: () => Promise<void>;
}

const TinyForm = ({
  handleFormSubmit: outerHandleFormSubmit,
  title,
  data,
  isCreate,
  handleDelete,
}: ITinyForm) => {
  const initialValues = {
    name: String(data?.name || ''),
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleFormSubmit = async (data: IValues) => {
    setLoading(true);
    await outerHandleFormSubmit(data);
    setLoading(false);
  };

  const { touched, values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const handleOpenAlert = () => {
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setOpen(false);
  };

  const isValuesNotChanged = () => {
    return initialValues.name === values.name;
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    handleDelete && (await handleDelete());
    setLoading(false);
  };

  const disabled = isValuesNotChanged() || loading;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '600px',
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb="20px" textAlign="center">
        {title}
      </Typography>
      <CustomTextField
        label="Tên"
        helperText={!!touched.name && errors.name}
        inputProps={{
          placeholder: 'Tên',
          value: values.name,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.name && !!errors.name,
          name: 'name',
        }}
      />

      <Box display="flex" gap="20px" mt="40px">
        {!isCreate && (
          <PrimaryButton
            variant="outlined"
            color="error"
            sx={{
              flex: '1',
            }}
            onClick={handleOpenAlert}
          >
            Xoá
          </PrimaryButton>
        )}
        <PrimaryButton disabled={disabled} variant="contained" type="submit" sx={{ flex: '1' }}>
          Lưu
        </PrimaryButton>
      </Box>
      {handleDelete && (
        <AlertDialog onConfirm={handleConfirmDelete} open={open} handleClose={handleCloseAlert} />
      )}
    </form>
  );
};

export default TinyForm;
