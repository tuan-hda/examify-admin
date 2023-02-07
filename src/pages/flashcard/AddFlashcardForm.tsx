import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box, Typography, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { IFlashcard, INewFlashcard, IUpdateFlashcard } from 'api/flashcard/flashcardInterface';

import { toast } from 'react-toastify';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import {
  addFlashcardService,
  deleteFlashcardService,
  getWordAudioService,
  updateFlashcardService,
} from 'api/flashcard/flashcard';
import { colors } from 'theme';
import { uploadImageService } from 'api/image/image';
import { useParams } from 'react-router-dom';

const validationSchema = yup.object().shape({
  word: yup.string().required('Bắt buộc nhập trường này'),
  meaning: yup.string().required('Bắt buộc nhập trường này'),
  type_of_word: yup.string().required('Bắt buộc nhập trường này'),
  pronounce: yup.string(),
  audio: yup.string(),
  example: yup.string(),
  note: yup.string(),
  image: yup.string(),
});

interface IFlashcardModal {
  isCreate?: boolean;
  onCreate?: (data: IFlashcard) => void;
  initialData?: IUpdateFlashcard;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function AddFlashcardForm({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IFlashcardModal) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const { flashcardSetId } = useParams();
  const axios = useAxiosPrivate(true);

  const initialValues = initialData ?? {
    fc_id: -1,
    fc_set_id: 0,
    word: '',
    meaning: '',
    type_of_word: 'noun',
    image: '',
    audio: '',
    pronounce: '',
    example: '',
    note: '',
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

  function handleFormSubmit(data: INewFlashcard) {
    if (isCreate) {
      createFlashcardSet(data);
    } else if (initialData) {
      updateFlashcardSet({
        ...data,
        fc_id: initialData.id,
        id: initialData.id,
      });
    }
  }

  async function createFlashcardSet(data: INewFlashcard) {
    try {
      if (!flashcardSetId) return;
      setLoading(true);
      let formattedData = await formatData(data);
      const response = await addFlashcardService({ axios, ...formattedData });
      if (onCreate)
        onCreate({
          ...response.data.data,
          id: response.data.data.fc_id,
        });
      toast.success('Thêm flashcard thành công');
      hide();
    } catch (error) {
      console.log('🚀 ~ file: AddFlashcardForm.tsx:121 ~ createFlashcardSet ~ error', error);
      toast.error('Thêm thất bại');
    } finally {
      setLoading(false);
    }
  }

  async function updateFlashcardSet(data: IUpdateFlashcard) {
    try {
      setLoading(true);
      const formattedData = {
        ...data,
        ...(await formatData(data)),
      };
      await updateFlashcardService({ ...formattedData, axios });
      if (onUpdate) onUpdate();
      toast.success('Cập nhật bộ flashcard thành công');
      hide();
    } catch (error) {
      console.log('🚀 ~ file: AddFlashcardForm.tsx:148 ~ updateFlashcardSet ~ error', error);
      toast.error('Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  }

  async function formatData(data: INewFlashcard) {
    let formattedData = { ...data };
    try {
      formattedData.fc_set_id = Number(flashcardSetId);
      if (data.image !== initialValues.image && image) {
        const response = await uploadImageService(image, 'examify');
        const url = response.data.url;
        formattedData.image = url;
      }
      const phonetic = await generatePhonetic(data);
      formattedData.audio = phonetic.audio;
      formattedData.pronounce = phonetic.pronounce;
    } catch (error) {
      console.log(error);
    }
    return formattedData;
  }

  function handleUploadImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0];
      setImage(image);
      const tempImageUrl = URL.createObjectURL(image);
      setFieldValue('image', tempImageUrl);
    }
  }

  function isValuesNotChanged() {
    if (isCreate) {
      return (
        initialValues.word === values.word &&
        initialValues.meaning === values.meaning &&
        initialValues.type_of_word === values.type_of_word &&
        initialValues.image === values.image &&
        initialValues.audio === values.audio &&
        initialValues.example === values.example &&
        initialValues.note === values.note &&
        initialValues.pronounce === values.pronounce
      );
    } else if (initialData) {
      return (
        initialData.word === values.word &&
        initialData.meaning === values.meaning &&
        initialData.type_of_word === values.type_of_word &&
        initialData.image === values.image &&
        initialData.audio === values.audio &&
        initialData.example === values.example &&
        initialData.note === values.note &&
        initialData.pronounce === values.pronounce
      );
    }
    return true;
  }

  async function handleConfirmDelete() {
    try {
      setLoading(true);
      if (initialData) {
        await deleteFlashcardService({ axios, fc_id: initialData.id });
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

  function triggerFileInput() {
    ref.current && ref.current.click();
  }

  const disabled = isValuesNotChanged() || loading;

  async function generatePhonetic(data: INewFlashcard) {
    const result = {
      audio: '',
      pronounce: data.pronounce,
    };
    try {
      const response = await getWordAudioService(data.word);
      if (response.data.length > 0) {
        const audioRes = response.data[0].phonetics.find(
          (item: { audio: string; text: string }) => item.audio
        );
        const textRes = response.data[0].phonetics.find(
          (item: { audio: string; text: string }) => item.text
        );

        if (audioRes) {
          result.audio = audioRes.audio;
        }

        if (textRes && !data.pronounce) {
          result.pronounce = textRes.text;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      return result;
    }
  }

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
          {isCreate ? 'Thêm flashcard mới' : 'Cập nhật flashcard'}
        </Typography>
      )}
      <CustomTextField
        label="Từ"
        helperText={!!touched.word && errors.word}
        inputProps={{
          placeholder: 'Từ',
          value: values.word,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.word && !!errors.word,
          name: 'word',
        }}
      />
      <FormControl
        error={!!touched.type_of_word && !!errors.type_of_word}
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Loại từ
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.type_of_word}
          onBlur={handleBlur}
          onChange={handleChange}
          name="type_of_word"
        >
          <MenuItem value="noun">Danh từ</MenuItem>
          <MenuItem value="pronoun">Đại từ</MenuItem>
          <MenuItem value="verb">Động từ</MenuItem>
          <MenuItem value="adjective">Tính từ</MenuItem>
          <MenuItem value="adverb">Trạng từ</MenuItem>
          <MenuItem value="preposition">Giới từ</MenuItem>
          <MenuItem value="conjunction">Liên từ</MenuItem>
          <MenuItem value="interjection">Thán từ</MenuItem>
        </Select>
        <FormHelperText>{!!touched.type_of_word && errors.type_of_word}</FormHelperText>
      </FormControl>

      <CustomTextField
        label="Nghĩa"
        sx={{
          mt: '24px',
        }}
        helperText={!!touched.meaning && errors.meaning}
        inputProps={{
          placeholder: 'Nghĩa',
          value: values.meaning,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.meaning && !!errors.meaning,
          name: 'meaning',
        }}
      />

      <CustomTextField
        label="Phiên âm"
        sx={{
          mt: '24px',
        }}
        helperText={!!touched.pronounce && errors.pronounce}
        inputProps={{
          placeholder: 'Phiên âm',
          value: values.pronounce,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.pronounce && !!errors.pronounce,
          name: 'pronounce',
        }}
      />

      {/* Image */}
      <label
        style={{
          fontWeight: 'bold',
          color: '#000 !important',
          marginTop: '24px',
          display: 'block',
        }}
      >
        Ảnh
      </label>
      <Box
        border="solid 1px"
        borderColor={colors.grey.light}
        width="100%"
        borderRadius="10px"
        overflow="hidden"
        sx={{
          aspectRatio: '3/2',
        }}
      >
        {values.image && (
          <img
            src={values.image}
            alt="Flashcard"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>
      <FormHelperText
        sx={{
          color: colors.red[500],
          ml: '16px',
        }}
      >
        {!!touched.image && errors.image}
      </FormHelperText>
      <PrimaryButton
        onClick={triggerFileInput}
        variant="outlined"
        sx={{ mt: '24px', width: '100%' }}
      >
        {!image ? 'Thêm ảnh' : 'Thay đổi ảnh'}
      </PrimaryButton>
      <input
        accept=".jpg, .png"
        onChange={handleUploadImage}
        type="file"
        style={{
          display: 'none',
        }}
        ref={ref}
      />

      <CustomTextField
        label="Ví dụ"
        sx={{
          mt: '24px',
        }}
        helperText={!!touched.example && errors.example}
        inputProps={{
          placeholder: 'Ví dụ',
          value: values.example,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.example && !!errors.example,
          name: 'example',
        }}
      />

      <CustomTextField
        label="Ghi chú"
        sx={{
          mt: '24px',
        }}
        helperText={!!touched.note && errors.note}
        inputProps={{
          placeholder: 'Ghi chú',
          value: values.note,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.note && !!errors.note,
          name: 'note',
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

export default AddFlashcardForm;
