import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import { initialSet, ISet } from 'api/exam/examInterface';
import {
  createSetQuestionService,
  deleteSetQuestionService,
  updateSetQuestionService,
} from 'api/exam/exam';
import { useParams } from 'react-router-dom';

const validationSchema = yup.object().shape({
  title: yup.string(),
  audio: yup.string(),
});

interface IFormSet {
  isCreate?: boolean;
  onCreate?: () => void;
  initialData?: ISet;
  onUpdate?: () => void;
  onDelete?: () => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function FormSet({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IFormSet) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { partId } = useParams();

  const initialValues: ISet = {
    ...initialSet,
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

  function handleFormSubmit(data: ISet) {
    if (isCreate) {
      createSet(data);
    } else if (initialData) {
      updateSet(data);
    }
  }

  async function createSet(data: ISet) {
    try {
      setLoading(true);
      await createSetQuestionService({ ...data, partId });
      if (onCreate) onCreate();
      toast.success('Thêm thành công');
      hide();
    } catch (error) {
      console.log('🚀 ~ file: AddFlashcardSetModal.tsx:93 ~ createFlashcardType ~ error', error);
      toast.error('Thêm thất bại');
    } finally {
      setLoading(false);
    }
  }

  async function updateSet(data: ISet) {
    try {
      setLoading(true);
      await updateSetQuestionService(data);
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
    if (isCreate) return false;
    if (initialData) {
      return JSON.stringify(initialData) === JSON.stringify(values);
    }
    return true;
  }

  async function handleConfirmDelete() {
    setLoading(true);
    try {
      if (initialData) {
        await deleteSetQuestionService(initialData.id);
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
          {isCreate ? 'Thêm bộ câu hỏi cho phần thi' : 'Chỉnh sửa bộ câu hỏi'}
        </Typography>
      )}
      <CustomTextField
        label="Tiêu đề"
        helperText={!!touched.title && errors.title}
        inputProps={{
          placeholder: 'Tiêu đề',
          value: values.title,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.title && !!errors.title,
          name: 'title',
        }}
      />
      <CustomTextField
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        label="Ghi âm / âm thanh"
        helperText={!!touched.audio && errors.audio}
        inputProps={{
          placeholder: 'Ghi âm / âm thanh',
          value: values.audio,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.audio && !!errors.audio,
          name: 'audio',
        }}
      />
      {values.audio && (
        <audio
          src={values.audio}
          style={{
            marginTop: '12px',
            width: '100%',
          }}
          controls
        ></audio>
      )}

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

export default FormSet;
