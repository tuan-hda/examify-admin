import { initialExam } from './../../../api/exam/examInterface';
import { IExam } from 'api/exam/examInterface';
import { getExamDetailService } from 'api/exam/exam';
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

interface IInitialState {
  detail: IExam;
  isLoading: boolean;
  error: string;
}

const initialState: IInitialState = {
  detail: initialExam,
  isLoading: false,
  error: '',
};

export const getExamDetail = createAsyncThunk(
  'exam/getExamDetail',
  async (id: number, thunkAPI) => {
    try {
      const response = await getExamDetailService(id);
      return response.data.data;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExamDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.isLoading = false;
      state.error = '';
    });

    const pendingList: any = [getExamDetail.pending];
    const rejectedList: any = [getExamDetail.rejected];

    builder.addMatcher(isAnyOf(...pendingList), (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addMatcher(isAnyOf(...rejectedList), (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action.payload);
    });
  },
});

export default examSlice.reducer;
