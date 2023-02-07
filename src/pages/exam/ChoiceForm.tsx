import { IChoice, initialChoice } from 'api/exam/examInterface';
import Choice from './Choice';
import { Box, Typography } from '@mui/material';
import { colors } from 'theme';

interface IChoiceFormProps {
  choices: IChoice[];
  setChoices: React.Dispatch<React.SetStateAction<IChoice[]>>;
}

function ChoiceForm({ choices, setChoices }: IChoiceFormProps) {
  function addAnswer() {
    setChoices([...choices, initialChoice]);
  }

  function onChoose(index: number) {
    setChoices((prev) => {
      const result = prev.map((item) => ({
        ...item,
        key: false,
      }));
      result[index].key = true;
      return result;
    });
  }

  function onDelete(index: number) {
    setChoices((prev) => prev.filter((_, i) => i !== index));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    setChoices((prev) => {
      const result = [...prev];
      result[index] = {
        ...result[index],
        name: e.target.value,
      };
      return result;
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', mt: '12px' }}>
      {choices.map((c, i) => (
        <Choice
          choice={c}
          onChoose={onChoose}
          index={i}
          key={i}
          onDelete={onDelete}
          value={choices[i].name}
          onChange={onChange}
        />
      ))}

      <Typography
        sx={{ fontSize: '16px', fontWeight: 600, color: colors.primary[500], cursor: 'pointer' }}
        onClick={addAnswer}
      >
        Thêm câu trả lời
      </Typography>
    </Box>
  );
}

export default ChoiceForm;
