import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, FormHelperText, Typography } from '@mui/material';
import uploadPlugin from 'api/image/plugin';

const CustomCKEditor = ({
  touched,
  values,
  errors,
  setFieldValue,
  title,
  name,
  isRequired = true,
}) => {
  return (
    <Box
      mt="24px"
      sx={{
        '& .ck-rounded-corners': {
          border: !!touched[name] && !!errors[name] && '1px solid #d32f2f',
        },
      }}
    >
      <Typography
        fontWeight="bold"
        mt="24px"
        mb="12px"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {title} {!isRequired && <Typography>(Không bắt buộc)</Typography>}
      </Typography>
      <CKEditor
        config={{ extraPlugins: [uploadPlugin] }}
        editor={ClassicEditor}
        data={values[name]}
        onChange={(_, editor) => {
          const data = editor.getData();
          setFieldValue(name, data);
        }}
      />
      <FormHelperText
        sx={{
          color: '#d32f2f',
        }}
      >
        {!!touched[name] && errors[name]}
      </FormHelperText>
    </Box>
  );
};

export default CustomCKEditor;
