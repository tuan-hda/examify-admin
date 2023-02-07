import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

interface IAlertDialog {
  open: boolean;
  handleClose: () => void;
  title?: string;
  onConfirm: () => void;
}

export default function AlertDialog({ open, handleClose, onConfirm, title }: IAlertDialog) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ maxWidth: '100%', textAlign: 'center' }} id="alert-dialog-title">
        {title ?? 'Xác nhận xoá khỏi hệ thống'}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Huỷ</Button>
        <LoadingButton loading={loading} onClick={handleConfirm} color="error" autoFocus>
          Xoá
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
