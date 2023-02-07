import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box, Typography, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import {
  IFlashcardSet,
  INewFlashcardSet,
  IUpdateFlashcardSet,
} from 'api/flashcard/flashcardInterface';

import { toast } from 'react-toastify';
import useFetchFlashcardType from './hooks/useFetchFlashcardType';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import {
  createFlashcardSetService,
  deleteFlashcardSetService,
  updateFlashcardSetService,
} from 'api/flashcard/flashcard';

const validationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập trường này'),
  description: yup.string().required('Bắt buộc nhập trường này'),
  fc_type_id: yup
    .number()
    .required('Bắt buộc nhập trường này')
    .not([0], 'Bắt buộc nhập trường này'),
});

interface IFlashcardSetModal {
  isCreate?: boolean;
  onCreate?: (data: IFlashcardSet) => void;
  initialData?: IUpdateFlashcardSet;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function AddFlashcardSetModal({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IFlashcardSetModal) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { types } = useFetchFlashcardType();
  const axios = useAxiosPrivate(true);

  const initialValues = initialData ?? {
    fc_type_id: 0,
    name: '',
    description: '',
  };
  const { touched, values, handleBlur, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (initialData) {
      resetForm({
        values: initialData,
      });
    }
  }, [initialData, resetForm]);

  function handleFormSubmit(data: INewFlashcardSet) {
    if (isCreate) {
      createFlashcardSet(data);
    } else if (initialData) {
      updateFlashcardSet({
        ...data,
        id: initialData.id,
      });
    }
  }

  async function createFlashcardSet(data: INewFlashcardSet) {
    try {
      setLoading(true);
      const response = await createFlashcardSetService({ axios, ...data });
      if (onCreate)
        onCreate({
          ...response.data.data,
          id: response.data.data.fc_set_id,
        });
      toast.success('Thêm bộ flashcard thành công');
      hide();
    } catch (error) {
      console.log('🚀 ~ file: AddFlashcardSetModal.tsx:93 ~ createFlashcardType ~ error', error);
      toast.error('Thêm thất bại');
    } finally {
      setLoading(false);
    }
  }

  async function updateFlashcardSet(data: IUpdateFlashcardSet) {
    try {
      setLoading(true);
      await updateFlashcardSetService({ ...data, axios });
      if (onUpdate) onUpdate();
      toast.success('Cập nhật bộ flashcard thành công');
      hide();
    } catch (error) {
      toast.error('Cập nhật thất bại');
      console.log('🚀 ~ file: AddFlashcardTypeModal.tsx:38 ~ handleFormSubmit ~ error', error);
    } finally {
      setLoading(false);
    }
  }

  function isValuesNotChanged() {
    if (isCreate) {
      return (
        initialValues.name === values.name &&
        initialValues.description === values.description &&
        initialValues.fc_type_id === values.fc_type_id
      );
    } else if (initialData) {
      return (
        initialData.name === values.name &&
        initialData.description === values.description &&
        initialData.fc_type_id === values.fc_type_id
      );
    }
    return true;
  }

  async function handleConfirmDelete() {
    setLoading(true);
    try {
      if (initialData) {
        await deleteFlashcardSetService({ axios, fc_set_id: initialData.id });
        if (onDelete) onDelete(initialData.id);
        toast.success('Xoá thành công');
        hide();
      }
    } catch (error) {
      console.log('🚀 ~ file: AddFlashcardTypeModal.tsx:107 ~ handleConfirmDelete ~ error', error);
      toast.error('Xoá thất bại');
    } finally {
      setLoading(false);
    }
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  const disabled = isValuesNotChanged() || loading;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '600px',
      }}
    >
      {!hideTitle && (
        <Typography variant="h5" fontWeight="bold" mb="20px" textAlign="center">
          Thêm bộ flashcard mới
        </Typography>
      )}
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
      <FormControl
        error={!!touched.fc_type_id && !!errors.fc_type_id}
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Loại
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.fc_type_id}
          onBlur={handleBlur}
          onChange={handleChange}
          name="fc_type_id"
        >
          <MenuItem value={0} disabled>
            Chọn
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type.fc_type_id} value={type.fc_type_id}>
              {type.type}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{!!touched.fc_type_id && errors.fc_type_id}</FormHelperText>
      </FormControl>

      <CustomTextField
        label="Mô tả"
        sx={{
          mt: '24px',
        }}
        helperText={!!touched.description && errors.description}
        inputProps={{
          placeholder: 'Mô tả',
          multiline: true,
          rows: 3,
          value: values.description,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.description && !!errors.description,
          name: 'description',
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
            onClick={toggle}
          >
            Xoá
          </PrimaryButton>
        )}
        <PrimaryButton disabled={disabled} variant="contained" type="submit" sx={{ flex: '1' }}>
          Lưu
        </PrimaryButton>
      </Box>
      {!isCreate && (
        <AlertDialog onConfirm={handleConfirmDelete} open={open} handleClose={toggle} />
      )}
    </form>
  );
}

export default AddFlashcardSetModal;
