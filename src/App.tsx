import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { authenticationRoutes, routes } from './routes';
import './index.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import AuthLayout from 'components/layout/AuthLayout';
import CourseDetail from 'pages/course/CourseDetail/CourseDetail';
import ChapterDetail from 'pages/course/ChapterDetail/ChapterDetail';
import UnitDetail from 'pages/course/UnitDetail';
import LessonDetail from 'pages/course/LessonDetail/LessonDetail';
import DetailLayout from 'components/layout/DetailLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlashcardSetDetail from 'pages/flashcard/FlashcardSetDetail';
import ExamDetail from 'pages/exam/ExamDetail';
import ExamLayout from 'components/layout/ExamLayout';
import PartDetail from 'pages/exam/PartDetail';
import SetDetail from 'pages/exam/SetDetail';
import PageWrapper from 'components/layout/PageWrapper';

declare module '@mui/material/styles' {
  interface Theme {
    typography: {
      fontFamily: string;
    };
  }
  // allow configuration using `createTheme`
  interface TypographyOptions {
    typography?: {
      fontFamily?: string;
    };
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}

            {/* Course  */}
            <Route element={<DetailLayout />}>
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterDetail />} />
              <Route
                path="/course/:courseId/chapter/:chapterId/unit/:unitId"
                element={<UnitDetail />}
              />
              <Route
                path="/course/:courseId/chapter/:chapterId/unit/:unitId/lesson/:lessonId"
                element={<LessonDetail />}
              />
              <Route
                path="/course/:courseId/chapter/:chapterId/unit/:unitId/lesson/create"
                element={<LessonDetail type="create" />}
              />
            </Route>

            {/* Flashcard */}
            <Route path="/flashcard/set">
              <Route path="/flashcard/set/:flashcardSetId" element={<FlashcardSetDetail />} />
            </Route>

            {/* Exam */}
            <Route
              path="/exam/list"
              element={
                <PageWrapper state="exam.list">
                  <ExamLayout />
                </PageWrapper>
              }
            >
              <Route path="/exam/list/:examId" element={<ExamDetail />} />
              <Route path="/exam/list/:examId/part/:partId" element={<PartDetail />} />
              <Route path="/exam/list/:examId/part/:partId/set/:setId" element={<SetDetail />} />
            </Route>
          </Route>
          <Route element={<AuthLayout />}>{authenticationRoutes}</Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
