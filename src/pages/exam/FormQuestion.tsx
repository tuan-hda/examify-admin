import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
} from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import { IChoice, initialChoice, initialQuestion, IQuestion } from 'api/exam/examInterface';
import { useParams } from 'react-router-dom';
import ChoiceForm from './ChoiceForm';
import useFetchHashtags from './hooks/useFetchHashtags';
import { createQuestionService, deleteQuestionService, updateQuestionService } from 'api/exam/exam';
import CustomCKEditor from 'components/common/CustomCKEditor';

const validationSchema = yup.object().shape({
  name: yup.string(),
  level: yup.number().not([0, '0'], 'Bắt buộc chọn trường này'),
  explain: yup.string(),
  hashtagId: yup.number().not([0], 'Bắt buộc chọn trường này'),
});

interface IFormSet {
  isCreate?: boolean;
  onCreate?: () => void;
  initialData?: IQuestion;
  initialChoices?: IChoice[];
  onUpdate?: () => void;
  onDelete?: () => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function FormQuestion({
  isCreate,
  onCreate,
  initialData,
  initialChoices,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IFormSet) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [choices, setChoices] = useState<IChoice[]>(initialChoices ?? Array(4).fill(initialChoice));
  const { setId } = useParams();
  const { data: hashtags } = useFetchHashtags();

  const initialValues: IQuestion = {
    ...initialQuestion,
    ...initialData,
  };
  const {
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (initialData) {
      resetForm({
        values: initialData,
      });
      setChoices(initialData.choices);
    }
  }, [initialData, resetForm]);

  function handleFormSubmit(data: IQuestion) {
    if (error) {
      return;
    }
    if (isCreate) {
      createQuestion(data);
    } else if (initialData) {
      updateQuestion(data);
    }
  }

  async function createQuestion(data: IQuestion) {
    try {
      setLoading(true);
      await createQuestionService({ ...data, setQuestionId: Number(setId || 0), choices });
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

  async function updateQuestion(data: IQuestion) {
    try {
      setLoading(true);
      await updateQuestionService({ ...data, choices, id: initialData?.id });
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
      return JSON.stringify(initialValues) === JSON.stringify({ ...values, choices });
    } else if (initialData) {
      return JSON.stringify(initialData) === JSON.stringify({ ...values, choices });
    }
    return true;
  }

  async function handleConfirmDelete() {
    setLoading(true);
    try {
      if (initialData) {
        await deleteQuestionService(initialData.id);
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

  function verify() {
    if (!choices.find((item) => item.key)) {
      setError('Phải có ít nhất 1 đáp án đúng');
      return;
    }

    setError('');
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
          {isCreate ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
        </Typography>
      )}
      <CustomTextField
        label="Câu hỏi"
        helperText={!!touched.name && errors.name}
        inputProps={{
          placeholder: 'Câu hỏi',
          value: values.name,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.name && !!errors.name,
          name: 'name',
        }}
      />
      <FormControl
        error={!!touched.level && !!errors.level}
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Mức độ
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.level}
          onBlur={handleBlur}
          onChange={handleChange}
          name="level"
        >
          <MenuItem value={0} disabled>
            Chọn
          </MenuItem>
          <MenuItem value={1}>Dễ</MenuItem>
          <MenuItem value={2}>Trung bình</MenuItem>
          <MenuItem value={3}>Khó</MenuItem>
        </Select>
        <FormHelperText>{!!touched.level && errors.level}</FormHelperText>
      </FormControl>

      <label
        style={{
          fontWeight: 'bold',
          color: '#000 !important',
          marginTop: '24px',
          display: 'block',
        }}
      >
        Các câu trả lời
      </label>

      <ChoiceForm choices={choices} setChoices={setChoices} />
      <FormHelperText sx={{ color: '#D32F2F' }}>{error}</FormHelperText>

      <Divider sx={{ mt: '24px' }} />

      <FormControl
        error={!!touched.hashtagId && !!errors.hashtagId}
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Hashtag
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.hashtagId}
          onBlur={handleBlur}
          onChange={handleChange}
          name="hashtagId"
        >
          <MenuItem value={0} disabled>
            Chọn
          </MenuItem>
          {hashtags.map((item: any) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{!!touched.hashtagId && errors.hashtagId}</FormHelperText>
      </FormControl>

      <CustomCKEditor
        touched={touched}
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        title="Giải thích"
        name="explain"
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
        <PrimaryButton
          disabled={disabled}
          variant="contained"
          type="submit"
          sx={{ flex: '1' }}
          onClick={verify}
        >
          Lưu
        </PrimaryButton>
      </Box>
      {!isCreate && (
        <AlertDialog onConfirm={handleConfirmDelete} open={open} handleClose={toggle} />
      )}
    </form>
  );
}

export default FormQuestion;
