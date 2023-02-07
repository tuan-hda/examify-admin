import { IChoice } from 'api/exam/examInterface';
import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface IChoiceProps {
  choice: IChoice;
  onChoose: (data: number) => void;
  onDelete: (data: number) => void;
  index: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

function Choice({ choice, onChoose, index, onDelete, value, onChange }: IChoiceProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <IconButton
        onClick={() => onChoose(index)}
        sx={{ width: '40px', height: '40px', border: '1px solid #ccc' }}
      >
        {choice.key && <CheckIcon />}
      </IconButton>

      <TextField
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, index)}
        size="small"
        sx={{ flex: 1 }}
      />

      <CloseIcon onClick={() => onDelete(index)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
    </Box>
  );
}

export default Choice;
