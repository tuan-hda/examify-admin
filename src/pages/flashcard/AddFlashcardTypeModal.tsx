import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import {
  IFlashcardType,
  INewFlashcardType,
  IUpdateFlashcardType,
} from 'api/flashcard/flashcardInterface';
import {
  createFlashcardTypeService,
  deleteFlashcardTypeService,
  updateFlashcardTypeService,
} from 'api/flashcard/flashcard';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  type: yup.string().required('Bắt buộc nhập trường này'),
  description: yup.string().required('Bắt buộc nhập trường này'),
});

interface IFlashcardModal {
  isCreate?: boolean;
  onCreate?: (data: IFlashcardType) => void;
  initialData?: IUpdateFlashcardType;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  hide: (data?: any) => void;
}

function AddFlashcardTypeModal({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
}: IFlashcardModal) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const initialValues = initialData ?? {
    type: '',
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

  function handleFormSubmit(data: INewFlashcardType) {
    if (isCreate) {
      createFlashcardType(data);
    } else if (initialData) {
      updateFlashcardType({
        ...data,
        id: initialData.id,
      });
    }
  }

  async function createFlashcardType(data: INewFlashcardType) {
    try {
      setLoading(true);
      const response = await createFlashcardTypeService(data);
      if (onCreate)
        onCreate({
          ...response.data.data,
          id: response.data.data.fc_type_id,
        });
      toast.success('Thêm loại flashcard thành công');
      hide();
    } catch (error) {
      toast.error('Thêm thất bại');
      console.log('🚀 ~ file: AddFlashcardTypeModal.tsx:38 ~ handleFormSubmit ~ error', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateFlashcardType(data: IUpdateFlashcardType) {
    try {
      setLoading(true);
      await updateFlashcardTypeService(data);
      if (onUpdate) onUpdate();
      toast.success('Cập nhật loại flashcard thành công');
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
      return initialValues.type === values.type && initialValues.description === values.description;
    } else if (initialData) {
      return initialData.type === values.type && initialData.description === values.description;
    }
    return true;
  }

  async function handleConfirmDelete() {
    setLoading(true);
    try {
      if (initialData) {
        await deleteFlashcardTypeService(initialData.id);
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
      <Typography variant="h5" fontWeight="bold" mb="20px" textAlign="center">
        {isCreate ? 'Thêm loại flashcard mới' : 'Chỉnh sửa loại flashcard'}
      </Typography>
      <CustomTextField
        label="Tên"
        helperText={!!touched.type && errors.type}
        inputProps={{
          placeholder: 'Tên',
          value: values.type,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.type && !!errors.type,
          name: 'type',
        }}
      />

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

export default AddFlashcardTypeModal;
