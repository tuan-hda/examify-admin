import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, FormHelperText, Typography } from '@mui/material';
import uploadPlugin from 'api/image/plugin';

const CourseCKEditor = ({ touched, values, errors, setFieldValue }) => {
  return (
    <>
      <Box
        mt="24px"
        sx={{
          '& .ck-rounded-corners': {
            border: !!touched.achieves && !!errors.achieves && '1px solid #d32f2f',
          },
        }}
      >
        <Typography fontWeight="bold" mb="12px">
          Kết quả đạt được
        </Typography>
        <CKEditor
          config={{ extraPlugins: [uploadPlugin] }}
          editor={ClassicEditor}
          data={values.achieves}
          onChange={(_, editor) => {
            const data = editor.getData();
            setFieldValue('achieves', data);
          }}
        />
        <FormHelperText
          sx={{
            color: '#d32f2f',
          }}
        >
          {!!touched.achieves && errors.achieves}
        </FormHelperText>
      </Box>

      <Box
        mt="24px"
        sx={{
          '& .ck-rounded-corners': {
            border: !!touched.description && !!errors.description && '1px solid #d32f2f',
          },
        }}
      >
        <Typography fontWeight="bold" mb="12px">
          Mô tả
        </Typography>
        <CKEditor
          config={{ extraPlugins: [uploadPlugin] }}
          editor={ClassicEditor}
          data={values.description}
          onChange={(_, editor) => {
            const data = editor.getData();
            setFieldValue('description', data);
          }}
        />
        <FormHelperText
          sx={{
            color: '#d32f2f',
          }}
        >
          {!!touched.description && errors.description}
        </FormHelperText>
      </Box>
    </>
  );
};

export default CourseCKEditor;
