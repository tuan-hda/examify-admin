import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { getCourseDetailService } from 'api/course/course';
import { findChapterIndexById } from './utils';

interface IState {
  course: any;
  isLoading: boolean;
  error: '';
}

const initialState: IState = {
  course: '',
  isLoading: false,
  error: '',
};

export const getCourseDetail = createAsyncThunk(
  'course/getCourseDetail',
  async (id: string, thunkAPI) => {
    try {
      const response = await getCourseDetailService(id);
      // console.log(getUnitListWithChapterId(response.data.data));
      return response.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.status);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState: initialState as IState,
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    finish: (state) => {
      state.isLoading = false;
    },
    updateCourse: (state, action) => {
      state.course = {
        ...state.course,
        ...action.payload,
      };
    },
    addChapter: (state, action) => {
      (state.course.chapterList || []).push(action.payload);
    },
    updateChapter: (state, action) => {
      const updatedChapter = action.payload;
      const chapterIndex = findChapterIndexById(state.course, updatedChapter.id);

      if (chapterIndex !== -1) {
        const oldChapter = state.course.chapterList[chapterIndex];
        state.course.chapterList[chapterIndex] = {
          ...oldChapter,
          ...updatedChapter,
        };
      }
    },
    deleteChapter: (state, action) => {
      state.course.chapterList = state.course.chapterList.filter(
        (chapter: any) => chapter.id !== action.payload
      );
    },
    addUnit: (state, action) => {
      const newUnit = action.payload;
      const chapterIndex = findChapterIndexById(state.course, newUnit.chapterId);
      if (chapterIndex !== -1) {
        state.course.chapterList[chapterIndex].unitList.push(newUnit);
      }
    },
  },
  extraReducers: (builder) => {
    // Get all courses
    builder.addCase(getCourseDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.course = action.payload;
      state.error = '';
    });

    const pendingList: any = [getCourseDetail.pending];
    const rejectedList: any = [getCourseDetail.rejected];

    builder.addMatcher(isAnyOf(...pendingList), (state) => {
      state.isLoading = true;
      state.error = '';
    });
    // builder.addMatcher(isAnyOf(...emptyFulfilledList), (state, action) => {
    //   state.isLoading = false;
    //   state.error = '';
    //   console.log(action.payload);
    // });
    builder.addMatcher(isAnyOf(...rejectedList), (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action.payload);
    });
  },
});

export const { pending, finish, updateCourse, addChapter, updateChapter, deleteChapter, addUnit } =
  courseSlice.actions;

export default courseSlice.reducer;
