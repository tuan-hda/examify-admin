import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import useFetchFlashcardSets from 'pages/flashcard/hooks/useFetchFlashcardSets';
import { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import { IFlashcardSet } from 'api/flashcard/flashcardInterface';

interface ICustomFlashcardSet extends IFlashcardSet {
  label?: string;
}

const FlashcardForm = ({
  touched,
  errors,
  setFieldValue,
  setErrors,
  setTouched,
  values: outerValues,
}: any) => {
  const [value, setValue] = useState<ICustomFlashcardSet | null>(null);
  const [inputValue, setInputValue] = useState('');
  const { sets } = useFetchFlashcardSets();
  let searchSets = sets
    .filter((set) => set.system_belong)
    .map((item) => ({ ...item, label: item.fc_set_id + ' - ' + item.name }));

  function handleChange(e: any, newValue: any) {
    setValue(newValue);
    setFieldValue('flashcardSetId', newValue.fc_set_id);
    setErrors((prev: any) => {
      const { flashcardSetId, ...rest } = prev;
      return rest;
    });
    setTouched((prev: any) => {
      const { flashcardSetId, ...rest } = prev;
      return rest;
    });
  }

  useEffect(() => {
    if (outerValues.flashcardSetId) {
      const set = searchSets.find((item) => item.fc_set_id === Number(outerValues.flashcardSetId));
      if (set) setValue(set);
    }
  }, [outerValues, searchSets]);

  return (
    <>
      <FormControl
        error={!!touched.flashcardSetId && !!errors.flashcardSetId}
        variant="standard"
        fullWidth
        sx={{ mt: '24px' }}
      >
        <InputLabel
          sx={{
            fontWeight: 'bold',
            marginTop: '-16px',
            color: '#000 !important',
          }}
        >
          Tìm bộ Flashcard
        </InputLabel>
        <Autocomplete
          disablePortal
          value={value}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => JSON.stringify(option) === JSON.stringify(value)}
          placeholder="Tìm theo tên hoặc ID"
          id="combo-box-demo"
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={searchSets}
          sx={{ width: '100%', mt: '32px' }}
          renderInput={(params) => <TextField {...params} />}
        />
        <FormHelperText>{!!touched.flashcardSetId && errors.flashcardSetId}</FormHelperText>
      </FormControl>

      {/* <CustomTextField
        label="ID Bộ Flashcard"
        sx={{ mt: '24px' }}
        helperText={!!touched.flashcardSetId && errors.flashcardSetId}
        inputProps={{
          placeholder: 'ID Bộ Flashcard',
          value: values.flashcardSetId,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.flashcardSetId && !!errors.flashcardSetId,
          name: 'flashcardSetId',
        }}
      /> */}
    </>
  );
};

export default FlashcardForm;
