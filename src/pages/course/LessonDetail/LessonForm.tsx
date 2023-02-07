import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  createNewLessonService,
  deleteLessonService,
  updateLessonService,
} from 'api/course/course';
import { INewLesson } from 'api/course/courseInterface';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCourseDetail } from 'redux/features/course/courseSlice';
import { AppDispatch, RootState } from 'redux/store';
import getBiggestOrder from 'utils/getBiggestOrder';
import * as yup from 'yup';
import AlertDialog from '../AlertDialog';
import FlashcardForm from './FlashcardForm';
import TextForm from './TextForm';
import VideoForm from './VideoForm';

const validationSchema = yup.object().shape({
  name: yup.string().required('Mục này không được để trống'),
  description: yup.string().required('Mục này không được để trống'),
  type: yup.number().not([0], 'Mục này không được để trống'),
  videoUrl: yup.string().when('type', {
    is: 1,
    then: yup.string().required('Mục này không được để trống'),
  }),
  text: yup.string().when('type', {
    is: 2,
    then: yup.string().required('Mục này không được để trống'),
  }),
  flashcardSetId: yup.number().when('type', {
    is: 3,
    then: yup.number().not([0], 'Cần chọn một bộ flashcard'),
  }),
});

const LessonForm = ({ lesson, isCreate }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [videoTime, setVideoTime] = useState<number>(0);
  const { courseId, chapterId, unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { course } = useSelector((store: RootState) => store.course);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateLesson = async (data: INewLesson) => {
    if (courseId)
      try {
        const response = await createNewLessonService(data);
        const lessonId = response.data.data.id;
        toast.success('Tạo bài học thành công');
        dispatch(getCourseDetail(courseId));
        navigate(`/course/${courseId}/chapter/${chapterId}/unit/${unitId}/lesson/${lessonId}`);
        resetForm();
      } catch (error) {
        toast.error('Tạo bài học thất bại');
        console.log('🚀 ~ file: LessonForm.tsx:55 ~ handleCreateLesson ~ error', error);
      }
  };

  const handleUpdateLesson = async (data: INewLesson) => {
    if (courseId && lessonId) {
      try {
        const newData = { ...data, id: Number(lessonId), numericOrder: lesson.numericOrder };
        await updateLessonService(newData);
        toast.success('Cập nhật bài học thành công');
        dispatch(getCourseDetail(courseId));
      } catch (error) {
        toast.error('Cập nhật bài học thất bại');
        console.log('🚀 ~ file: LessonForm.tsx:77 ~ handleUpdateLesson ~ error', error);
      }
    }
  };

  const handleFormSubmit = async (data: any) => {
    if (!unitId) return;

    setLoading((prev) => true);
    // Get biggest order
    const chapter = course.chapterList.find((chapter: any) => chapter.id === Number(chapterId));
    const unit = chapter.unitList.find((unit: any) => unit.id === Number(unitId));
    const numericOrder = getBiggestOrder(unit.lessonList) + 1;

    const newData = {
      ...data,
      videoUrl: '',
      totalVideoTime: 0,
      text: '',
      flashcardSetId: 0,
      unitId,
      numericOrder,
    };

    switch (type) {
      case 1:
        newData.videoUrl = data.videoUrl;
        newData.totalVideoTime = videoTime;
        break;
      case 2:
        newData.text = data.text;
        break;
      case 3:
        newData.flashcardSetId = data.flashcardSetId;
        break;
      default:
        return;
    }

    if (isCreate) await handleCreateLesson(newData);
    else await handleUpdateLesson(newData);
    setLoading((prev) => false);
  };

  const initialValues = lesson
    ? {
        name: String(lesson.name),
        description: String(lesson.description),
        type: Number(lesson.type),
        videoUrl: String(lesson.videoUrl),
        text: String(lesson.text),
        flashcardSetId: Number(lesson.flashcardSetId),
      }
    : {
        name: '',
        description: '',
        type: 0,
        videoUrl: '',
        text: '',
        flashcardSetId: 0,
      };

  useEffect(() => {
    if (lesson && lesson.type) setType(Number(lesson.type));
  }, [lesson]);

  const isValuesNotChanged = () => {
    return (
      initialValues.name === values.name &&
      initialValues.description === values.description &&
      initialValues.type === values.type &&
      initialValues.videoUrl === values.videoUrl &&
      initialValues.text === values.text &&
      initialValues.flashcardSetId === values.flashcardSetId
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
    resetForm,
    setErrors,
    setTouched,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(Number(e.target.value));
    handleChange(e);
    setLoading(false);
  };

  const disableButton = () => {
    return isValuesNotChanged() || loading;
  };

  const updateVideoTime = (value: number) => {
    setVideoTime(value);
  };

  const handleDeleteLesson = async () => {
    if (lessonId && courseId) {
      try {
        await deleteLessonService(lessonId);
        toast.success('Xoá khoá học thành công');
        dispatch(getCourseDetail(courseId));
        navigate(`/course/${courseId}/chapter/${chapterId}/unit/${unitId}`, {
          state: {
            list: true,
          },
        });
      } catch (error) {
        toast.error('Xoá khoá học thất bại');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '1000px',
        paddingBottom: '24px',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
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
        label="Mô tả"
        helperText={!!touched.description && errors.description}
        sx={{ mt: '24px' }}
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
      <FormControl
        error={!!touched.type && !!errors.type}
        sx={{ mt: '24px', width: '400px', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Loại bài học
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={String(values.type)}
          onBlur={handleBlur}
          onChange={handleTypeChange}
          name="type"
        >
          <MenuItem value={0} disabled>
            Chọn
          </MenuItem>
          <MenuItem value={1}>Video</MenuItem>
          <MenuItem value={2}>Văn bản</MenuItem>
          <MenuItem value={3}>Flashcard</MenuItem>
        </Select>
        <FormHelperText>{!!touched.type && errors.type}</FormHelperText>
      </FormControl>

      <VideoForm
        style={{
          display: type !== 1 && 'none',
          pointerEvents: type !== 1 && 'none',
        }}
        setLoading={setLoading}
        updateVideoTime={updateVideoTime}
        touched={touched}
        values={values}
        handleBlur={handleBlur}
        handleChange={handleChange}
        errors={errors}
      />
      {type === 2 && (
        <TextForm touched={touched} values={values} errors={errors} setFieldValue={setFieldValue} />
      )}
      {type === 3 && (
        <FlashcardForm
          touched={touched}
          setErrors={setErrors}
          setTouched={setTouched}
          values={values}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
        />
      )}

      <Box display="flex" justifyContent="end" gap="20px" mt="40px">
        {!isCreate && (
          <PrimaryButton variant="outlined" color="error" onClick={handleOpen}>
            Xoá bài này
          </PrimaryButton>
        )}
        <PrimaryButton disabled={disableButton()} variant="contained" type="submit">
          {isCreate ? 'Tạo mới' : 'Lưu'}
        </PrimaryButton>
      </Box>

      <AlertDialog open={open} handleClose={handleClose} onConfirm={handleDeleteLesson} />
    </form>
  );
};

export default LessonForm;
