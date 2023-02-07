import Box from '@mui/material/Box';
import { SelectChangeEvent, SxProps } from '@mui/material';
import { useFormik } from 'formik';
import { useRef, useState, useMemo, useEffect } from 'react';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { colors } from '../../../theme';
import * as yup from 'yup';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import CustomTextField from '../../../components/common/CustomTextField';
import AlertDialog from '../AlertDialog';
import CourseCKEditor from '../CourseCKEditor';
import { ChangeEvent } from 'react';
import { uploadImageService } from 'api/image/image';
import Typography from '@mui/material/Typography/Typography';

const sx: SxProps = {
  mt: '24px',
};

export interface IValues {
  pointToUnlock: string;
  price: string;
  discount: string;
  pointReward: string;
  courseType: string;
  level: string;
  courseTitle: string;
  description: string;
  achieves: string;
  image: string;
}

interface ICourseForm {
  course?: any;
  isCreate?: boolean;
  handleFormSubmit: (data: IValues) => void;
  handleDelete?: () => void;
}

const CourseForm = ({
  course,
  isCreate,
  handleFormSubmit: outerHandleFormSubmit,
  handleDelete,
}: ICourseForm) => {
  const [image, setImage] = useState<File>();

  const initialValues = useMemo(() => {
    if (isCreate || !course)
      return {
        pointToUnlock: '',
        price: '',
        discount: '',
        pointReward: '',
        courseType: '',
        level: '',
        courseTitle: '',
        description: '',
        achieves: '',
        image: '',
      };

    return {
      pointToUnlock: String(course.pointToUnlock),
      price: String(course.price),
      discount: String(course.discount),
      pointReward: String(course.pointReward),
      courseType: course.charges ? 'paid' : 'free',
      level: String(course.level),
      courseTitle: String(course.name),
      description: String(course.description),
      achieves: String(course.achieves),
      image: String(course.image),
    };
  }, [course, isCreate]);

  useEffect(() => {
    if (course) setCourseType(String(course.charges ? 'paid' : 'free'));
  }, [course]);
  const [courseType, setCourseType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const courseSchema = useMemo(
    () =>
      yup.object().shape({
        pointToUnlock: yup.number().when('courseType', {
          is: 'free',
          then: yup
            .number()
            .typeError('Phải nhập vào một số')
            .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
              return value !== undefined && value >= 0;
            }),
        }),
        pointReward: yup
          .number()
          .typeError('Phải nhập vào một số')
          .required('Mục này không được để trống')
          .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
            return value !== undefined && value >= 0;
          }),
        price: yup.number().when('courseType', {
          is: 'paid',
          then: yup
            .number()
            .typeError('Phải nhập vào một số')
            .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
              return value !== undefined && value >= 0;
            }),
        }),
        discount: yup.number().when('courseType', {
          is: 'paid',
          then: yup
            .number()
            .typeError('Phải nhập vào một số')
            .test('Is Positive?', 'Cần nhập vào giá trị hợp lệ', (value?: number) => {
              return value !== undefined && value >= 0 && value <= 100;
            }),
        }),
        courseType: yup.string().required('Mục này không được để trống'),
        level: yup.string().required('Mục này không được để trống'),
        courseTitle: yup.string().required('Mục này không được để trống'),
        description: yup.string().required('Mục này không được để trống'),
        achieves: yup.string().required('Mục này không được để trống'),
        image: yup.string().required('Bạn phải tải lên 1 ảnh'),
      }),
    []
  );

  const handleFormSubmit = async (data: IValues) => {
    setLoading(true);
    try {
      let dataWithImage = { ...data };
      if (data.image !== initialValues.image && image) {
        const response = await uploadImageService(image, 'examify');
        const url = response.data.url;
        dataWithImage.image = url;
      }
      outerHandleFormSubmit(dataWithImage);
    } catch (error) {
      console.log('🚀 ~ file: CourseForm.tsx:129 ~ handleFormSubmit ~ error', error);
    } finally {
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: courseSchema,
  });

  useEffect(() => {
    if (initialValues && setValues) {
      setValues(initialValues);
    }
  }, [initialValues, setValues]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const triggerFileInput = () => {
    ref.current && ref.current.click();
  };

  const handleTypeChange = (e: SelectChangeEvent<string>, fn: any) => {
    setCourseType(e.target.value);
    fn(e);
  };

  const isValueNotChanged = () => {
    return (
      initialValues.pointToUnlock === values.pointToUnlock &&
      initialValues.price === values.price &&
      initialValues.discount === values.discount &&
      initialValues.pointReward === values.pointReward &&
      initialValues.courseType === values.courseType &&
      initialValues.level === values.level &&
      initialValues.description === values.description &&
      initialValues.achieves === values.achieves &&
      initialValues.courseTitle === values.courseTitle &&
      initialValues.image === values.image
    );
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setImage(image);
      const tempImageUrl = URL.createObjectURL(image);
      setFieldValue('image', tempImageUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth="600px"
        position="relative"
        left="50%"
        sx={{
          transform: 'translateX(-50%)',
        }}
      >
        {/* Image */}
        <Box
          border="solid 1px"
          borderColor={!!touched.image && !!errors.image ? colors.red[500] : colors.grey.light}
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
              alt={values.courseTitle}
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
        <PrimaryButton onClick={triggerFileInput} variant="outlined" sx={{ ...sx, width: '100%' }}>
          {!image ? 'Thêm ảnh' : 'Thay đổi ảnh'}
        </PrimaryButton>

        {/* Input list */}
        <CustomTextField
          label="Tên khoá học"
          helperText={!!touched.courseTitle && errors.courseTitle}
          inputProps={{
            placeholder: 'Tên khoá học',
            value: values.courseTitle,
            onBlur: handleBlur,
            onChange: handleChange,
            error: !!touched.courseTitle && !!errors.courseTitle,
            name: 'courseTitle',
          }}
          sx={sx}
        />

        <FormControl fullWidth error={!!touched.level && !!errors.level} sx={sx}>
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
            <MenuItem value="basic">Cơ bản</MenuItem>
            <MenuItem value="general">Trung bình</MenuItem>
            <MenuItem value="advance">Nâng cao</MenuItem>
          </Select>
          <FormHelperText>{!!touched.level && errors.level}</FormHelperText>
        </FormControl>
        <FormControl error={!!touched.courseType && !!errors.courseType} fullWidth sx={sx}>
          <label
            style={{
              fontWeight: 'bold',
              color: '#000 !important',
            }}
          >
            Loại khoá học
          </label>
          <Select
            sx={{
              mt: '3px',
            }}
            value={values.courseType}
            onBlur={handleBlur}
            onChange={(e) => handleTypeChange(e, handleChange)}
            name="courseType"
            placeholder="Loại khoá học"
          >
            <MenuItem value="free">Miễn phí</MenuItem>
            <MenuItem value="paid">Trả phí</MenuItem>
          </Select>
          <FormHelperText>{!!touched.courseType && errors.courseType}</FormHelperText>
        </FormControl>
        {courseType === 'free' && (
          <CustomTextField
            label="Điểm mở khoá"
            helperText={!!touched.pointToUnlock && errors.pointToUnlock}
            inputProps={{
              placeholder: 'Điểm mở khoá',
              value: values.pointToUnlock,
              onBlur: handleBlur,
              onChange: handleChange,
              error: !!touched.pointToUnlock && !!errors.pointToUnlock,
              name: 'pointToUnlock',
            }}
            sx={sx}
          />
        )}
        {courseType === 'paid' && (
          <>
            <CustomTextField
              label="Giá"
              helperText={!!touched.price && errors.price}
              inputProps={{
                placeholder: 'Giá',
                value: values.price,
                onBlur: handleBlur,
                onChange: handleChange,
                error: !!touched.price && !!errors.price,
                name: 'price',
              }}
              sx={sx}
            />
            <CustomTextField
              label="Giảm giá %"
              helperText={!!touched.discount && errors.discount}
              inputProps={{
                placeholder: 'Giảm giá',
                value: values.discount,
                onBlur: handleBlur,
                onChange: handleChange,
                error: !!touched.discount && !!errors.discount,
                name: 'discount',
              }}
              sx={sx}
            />
          </>
        )}

        <CustomTextField
          label="Điểm thưởng hoàn thành"
          helperText={!!touched.pointReward && errors.pointReward}
          inputProps={{
            placeholder: 'Điểm thưởng hoàn thành',
            value: values.pointReward,
            onBlur: handleBlur,
            onChange: handleChange,
            error: !!touched.pointReward && !!errors.pointReward,
            name: 'pointReward',
          }}
          sx={sx}
        />
        <CourseCKEditor
          touched={touched}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <Box display="flex" gap="20px" mt="40px">
          {!isCreate && (
            <PrimaryButton
              variant="outlined"
              color="error"
              sx={{
                flex: '1',
              }}
              onClick={handleOpen}
            >
              Xoá khoá học này
            </PrimaryButton>
          )}
          <PrimaryButton
            loading={loading}
            disabled={isValueNotChanged()}
            variant="contained"
            type="submit"
            sx={{ flex: '1' }}
          >
            <Typography
              sx={{
                textTransform: 'none',
              }}
              fontWeight="600"
            >
              Lưu
            </Typography>
          </PrimaryButton>
        </Box>

        <input
          accept=".jpg, .png"
          onChange={handleUploadImage}
          type="file"
          style={{
            display: 'none',
          }}
          ref={ref}
        />
      </Box>

      {handleDelete && (
        <AlertDialog open={open} handleClose={handleClose} onConfirm={handleDelete} />
      )}
    </form>
  );
};

export default CourseForm;
