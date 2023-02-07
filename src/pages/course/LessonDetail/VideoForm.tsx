import { Box, SxProps, Typography } from '@mui/material';
import CustomTextField from 'components/common/CustomTextField';
import YouTube, { YouTubeEvent } from 'react-youtube';
import getYouTubeID from 'get-youtube-id';

const playerStyle = {
  width: '100%',
  height: '100%',
};

const sx: SxProps = {
  width: '100%',
  aspectRatio: '16/9',
  borderRadius: '12px',
  overflow: 'hidden',
};

const VideoForm = ({
  touched,
  values,
  handleBlur,
  handleChange,
  errors,
  setLoading,
  updateVideoTime,
  style,
}: any) => {
  const getDuration = (e: YouTubeEvent) => {
    setLoading((prev: any) => false);
    updateVideoTime(e.target.getDuration());
  };

  const handleChangeUrl = (e: any) => {
    handleChange(e);
    if (e.target.value) setLoading((prev: any) => true);
  };

  return (
    <Box sx={style}>
      <CustomTextField
        label="URL"
        helperText={!!touched.videoUrl && errors.videoUrl}
        sx={{
          mt: '24px',
        }}
        inputProps={{
          placeholder: 'URL',
          value: values.videoUrl,
          onBlur: handleBlur,
          onChange: handleChangeUrl,
          error: !!touched.videoUrl && !!errors.videoUrl,
          name: 'videoUrl',
        }}
      />

      <Typography fontWeight="bold" mt="24px" mb="12px">
        Xem trước
      </Typography>
      {values.videoUrl && (
        <Box sx={sx}>
          <YouTube
            onReady={getDuration}
            videoId={getYouTubeID(values.videoUrl) || ''}
            style={playerStyle}
            opts={playerStyle}
          />
        </Box>
      )}
    </Box>
  );
};

export default VideoForm;
