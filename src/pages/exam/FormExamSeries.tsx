import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IExamSeries, initialExamSeries } from 'api/exam/examInterface';
import {
  createExamSeriesService,
  deleteExamSeriesService,
  updateExamSeriesService,
} from 'api/exam/exam';

const validationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập trường này'),
});

interface IExamSeriesForm {
  isCreate?: boolean;
  onCreate?: () => void;
  initialData?: IExamSeries;
  onUpdate?: () => void;
  onDelete?: () => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function FormExamSeries({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IExamSeriesForm) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const axios = useAxiosPrivate(true);

  const initialValues: IExamSeries = {
    ...initialExamSeries,
    ...initialData,
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

  function handleFormSubmit(data: IExamSeries) {
    if (isCreate) {
      createExamSeries(data);
    } else if (initialData) {
      updateExamSeries({
        ...data,
        id: initialData.id,
      });
    }
  }

  async function createExamSeries(data: IExamSeries) {
    try {
      setLoading(true);
      await createExamSeriesService({
        name: data.name,
        author: data.author,
        createdBy: data.createdBy,
      });
      if (onCreate) onCreate();
      toast.success('Thêm bộ đề thi thành công');
      hide();
    } catch (error: any) {
      console.log('🚀 ~ file: FormExamSeries.tsx:81 ~ createExamSeries ~ error', error);
      toast.error('Thêm thất bại');
    } finally {
      setLoading(false);
    }
  }

  async function updateExamSeries(data: IExamSeries) {
    try {
      setLoading(true);
      await updateExamSeriesService({ ...data, axios });
      if (onUpdate) onUpdate();
      toast.success('Cập nhật thành công');
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
      return JSON.stringify(initialValues) === JSON.stringify(values);
    } else if (initialData) {
      return JSON.stringify(initialData) === JSON.stringify(values);
    }
    return true;
  }

  async function handleConfirmDelete() {
    setLoading(true);
    try {
      if (initialData) {
        await deleteExamSeriesService(initialData.id);
        if (onDelete) onDelete();
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
          {isCreate ? 'Thêm bộ đề' : 'Chỉnh sửa bộ đề'}
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

      <CustomTextField
        label="Tác giả"
        sx={{ mt: '24px' }}
        helperText={!!touched.author && errors.author}
        inputProps={{
          placeholder: 'Tác giả',
          value: values.author,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.author && !!errors.author,
          name: 'author',
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

export default FormExamSeries;
