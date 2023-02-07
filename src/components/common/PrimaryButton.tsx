import { colors } from '../../theme';
import { styled } from '@mui/system';
import { LoadingButton } from '@mui/lab';

const PrimaryButton = styled(LoadingButton)(({ variant, disabled }) => ({
  color: variant === 'contained' && !disabled ? '#fff' : undefined,
  bgcolor: variant === 'contained' && !disabled ? colors.primary[500] : undefined,
  textTransform: 'none',
  borderRadius: '6px',
  width: '144px',
  height: '44px',
  fontWeight: '600',
}));

export default PrimaryButton;
