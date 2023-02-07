import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { SxProps } from '@mui/material';

const sx: SxProps = {
  p: '10px 12px',
  m: '4px 2px 6px',
};

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton sx={sx} />
      <GridToolbarExport sx={sx} />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
