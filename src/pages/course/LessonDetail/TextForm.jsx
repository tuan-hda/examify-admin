import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, FormHelperText, Typography } from '@mui/material';
import uploadPlugin from 'api/image/plugin';

const TextForm = ({ touched, values, errors, setFieldValue }) => {
  return (
    <Box
      mt="24px"
      sx={{
        '& .ck-rounded-corners': {
          border: !!touched.text && !!errors.text && '1px solid #d32f2f',
        },
      }}
    >
      <Typography fontWeight="bold" mt="24px" mb="12px">
        Nội dung
      </Typography>
      <CKEditor
        config={{ extraPlugins: [uploadPlugin] }}
        editor={ClassicEditor}
        data={values.text}
        onChange={(_, editor) => {
          const data = editor.getData();
          setFieldValue('text', data);
        }}
      />
      <FormHelperText
        sx={{
          color: '#d32f2f',
        }}
      >
        {!!touched.text && errors.text}
      </FormHelperText>
    </Box>
  );
};

export default TextForm;
