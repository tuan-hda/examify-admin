import { useFormik } from 'formik';
import { KeyboardEvent, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
} from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IExam, INewExam, IUpdateExam } from 'api/exam/examInterface';
import Switch from '@mui/material/Switch';
import useFetchExamSeries from './hooks/useFetchExamSeries';
import { createExamService, deleteExamService, updateExamService } from 'api/exam/exam';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập trường này'),
  examSeriesId: yup
    .number()
    .required('Bắt buộc nhập trường này')
    .not([0], 'Bắt buộc nhập trường này'),
  pointReward: yup
    .number()
    .required('Bắt buộc nhập trường này')
    .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
      return value !== undefined && value >= 0;
    }),
  isFullExplanation: yup.boolean(),
  duration: yup
    .number()
    .required('Bắt buộc nhập trường này')
    .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
      return value !== undefined && value >= 0;
    }),
  hashtag: yup.array().of(yup.string()),
  hashtagText: yup.string(),
});

interface IExamForm {
  isCreate?: boolean;
  onCreate?: (data: IExam) => void;
  initialData?: IUpdateExam;
  onUpdate?: () => void;
  onDelete?: (id?: number) => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function FormExam({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IExamForm) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const axios = useAxiosPrivate(true);
  const { data: examSeries } = useFetchExamSeries();
  const navigate = useNavigate();

  const initialValues = initialData ?? {
    examSeriesId: 0,
    name: '',
    pointReward: 0,
    hashtag: [],
    isFullExplanation: false,
    duration: 0,
    hashtagText: '',
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
    }
  }, [initialData, resetForm]);

  function handleFormSubmit(data: INewExam) {
    console.log(data);
    if (isCreate) {
      createExam(data);
    } else if (initialData) {
      updateExam({
        ...data,
        id: initialData.id,
      });
    }
  }

  async function createExam(data: INewExam) {
    try {
      setLoading(true);
      const response = await createExamService(data);
      navigate('/exam/list/' + response.data.data.id);
      toast.success('Thêm đề thi thành công');
      hide();
    } catch (error) {
      console.log('🚀 ~ file: FormExam.tsx:123 ~ createExam ~ error', error);
      toast.error('Thêm thất bại');
    } finally {
      setLoading(false);
    }
  }

  async function updateExam(data: IUpdateExam) {
    try {
      setLoading(true);
      await updateExamService(data);
      if (onUpdate) onUpdate();
      toast.success('Cập nhật exam thành công');
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
    try {
      setLoading(true);
      if (initialData) {
        await deleteExamService(initialData.id || 0);
        if (onDelete) onDelete();
        toast.success('Xoá thành công');
      }
    } catch (error) {
      console.log('🚀 ~ file: AddFlashcardTypeModal.tsx:107 ~ handleConfirmDelete ~ error', error);
      toast.error('Xoá thất bại');
    } finally {
      setLoading(false);
      hide();
    }
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  function addHashtag(e: KeyboardEvent, value: string) {
    e.preventDefault();
    if (e.key === 'Enter' || e.keyCode === 13) {
      setFieldValue('hashtag', [...(values.hashtag || []), value]);
      setFieldValue('hashtagText', '');
    }
  }

  function preventEnterSubmitting(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
    }
  }

  function handleDeleteHashtag(data: number) {
    setFieldValue(
      'hashtag',
      values.hashtag?.filter((_, index) => index !== data)
    );
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
          Thêm đề thi mới
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
        error={!!touched.examSeriesId && !!errors.examSeriesId}
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Bộ đề thi
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.examSeriesId}
          onBlur={handleBlur}
          onChange={handleChange}
          name="examSeriesId"
        >
          <MenuItem value={0} disabled>
            Chọn
          </MenuItem>
          {examSeries?.map((series) => (
            <MenuItem value={series.id}>{series.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{!!touched.examSeriesId && errors.examSeriesId}</FormHelperText>
      </FormControl>

      <CustomTextField
        label="Điểm thưởng"
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        helperText={!!touched.pointReward && errors.pointReward}
        inputProps={{
          placeholder: 'Điểm thưởng',
          value: values.pointReward,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.pointReward && !!errors.pointReward,
          name: 'pointReward',
        }}
      />

      <CustomTextField
        label="Thời gian"
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        helperText={!!touched.duration && errors.duration}
        inputProps={{
          placeholder: 'Thời gian',
          value: values.duration,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.duration && !!errors.duration,
          name: 'duration',
        }}
      />

      <label
        style={{
          fontWeight: 'bold',
          color: '#000 !important',
          display: 'inline-block',
          marginTop: '24px',
        }}
      >
        Đầy đủ lời giải
      </label>
      <Switch
        name="isFullExplanation"
        value={values.isFullExplanation}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormHelperText>{!!touched.isFullExplanation && errors.isFullExplanation}</FormHelperText>

      <CustomTextField
        label="Âm thanh"
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        helperText={!!touched.audio && errors.audio}
        inputProps={{
          placeholder: 'Âm thanh',
          value: values.audio,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.audio && !!errors.audio,
          name: 'audio',
        }}
      />

      <CustomTextField
        label="File tải"
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        helperText={!!touched.fileDownload && errors.fileDownload}
        inputProps={{
          placeholder: 'File tải',
          value: values.fileDownload,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.fileDownload && !!errors.fileDownload,
          name: 'fileDownload',
        }}
      />

      <CustomTextField
        label="Thêm hashtag"
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        inputProps={{
          placeholder: 'Hashtag',
          value: values.hashtagText,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.hashtagText && !!errors.hashtagText,
          name: 'hashtagText',
          onKeyDown: preventEnterSubmitting,
          onKeyUp: (e: KeyboardEvent) => addHashtag(e, values.hashtagText),
        }}
      />
      <Box mt="12px" display="flex" flexWrap="wrap" gap="8px">
        {values.hashtag?.map((item, index) => (
          <Chip
            color="primary"
            label={item}
            key={index}
            onDelete={(_: any) => handleDeleteHashtag(index)}
          />
        ))}
      </Box>

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

export default FormExam;
