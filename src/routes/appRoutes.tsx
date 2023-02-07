import UserPageLayout from '../pages/dashboard/UserPageLayout';
import HomePage from '../pages/home/HomePage';
import { RouteType } from './config';
import { BiHomeAlt, BiLayout, BiDetail } from 'react-icons/bi';
import { AiFillCreditCard } from 'react-icons/ai';
import CourseListPage from '../pages/course/CourseListPage';
import CoursePageLayout from '../pages/course/CoursePageLayout';
import ExamPageLayout from '../pages/exam/ExamPageLayout';
import ExamIndex from '../pages/exam/ExamIndex';
import ExamListPage from '../pages/exam/ExamListPage';
import ExamCreatePage from '../pages/exam/ExamCreatePage';
import CourseCreatePage from '../pages/course/CourseCreatePage';
import { Outlet } from 'react-router-dom';
import { FlashcardType } from 'pages/flashcard';
import FlashcardSetList from 'pages/flashcard/FlashcardSetList';
import FlashcardSetDetail from 'pages/flashcard/FlashcardSetDetail';
import ExamSeriesPage from 'pages/exam/ExamSeriesPage';
import CourseStatistic from 'pages/course/statistics/CourseStatistic';
import ExamStatistic from 'pages/exam/statistics/ExamStatistic';
import FlashcardStatistic from 'pages/flashcard/statistics/FlashcardStatistic';
import UserList from 'pages/user/UserList';
import UserStatistic from 'pages/user/statistics/UserStatistic';
import HashtagList from 'pages/exam/HashtagList';

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: 'home',
  },
  {
    path: '/user',
    element: <UserPageLayout />,
    state: 'user',
    sidebarProps: {
      displayText: 'User',
      icon: <BiHomeAlt size={24} />,
    },
    child: [
      {
        index: true,
        element: <UserList />,
        state: 'user.index',
        path: '/user',
        sidebarProps: {
          displayText: 'Danh sách User',
        },
      },
      {
        path: '/user/statistic',
        element: <UserStatistic />,
        state: 'user.statistic',
        sidebarProps: {
          displayText: 'Thống kê',
        },
      },
    ],
  },
  {
    path: '/',
    element: <CoursePageLayout />,
    state: 'course',
    sidebarProps: {
      displayText: 'Khóa học',
      icon: <BiLayout size={24} />,
    },
    child: [
      {
        index: true,
        path: '/course',
        element: <CourseListPage />,
        state: 'course.list',
        sidebarProps: {
          displayText: 'Danh sách khoá học',
        },
      },
      {
        path: '/course/create',
        element: <CourseCreatePage />,
        state: 'course.create',
        sidebarProps: {
          displayText: 'Tạo khoá học',
        },
      },
      {
        path: '/course/statistic',
        element: <CourseStatistic />,
        state: 'course.statistic',
        sidebarProps: {
          displayText: 'Thống kê',
        },
      },
    ],
  },
  {
    path: '/exam',
    element: <ExamPageLayout />,
    state: 'exam',
    sidebarProps: {
      displayText: 'Đề thi',
      icon: <BiDetail size={24} />,
    },
    child: [
      {
        index: true,
        element: <ExamIndex />,
        state: 'exam.index',
      },
      {
        path: '/exam/series',
        element: <ExamSeriesPage />,
        state: 'exam.series',
        sidebarProps: {
          displayText: 'Danh sách bộ đề',
        },
      },
      {
        path: '/exam/list',
        element: <ExamListPage />,
        state: 'exam.list',
        sidebarProps: {
          displayText: 'Danh sách',
        },
      },
      {
        path: '/exam/create',
        element: <ExamCreatePage />,
        state: 'exam.create',
        sidebarProps: {
          displayText: 'Tạo đề',
        },
      },
      {
        path: '/exam/hashtag',
        element: <HashtagList />,
        state: 'exam.hashtag',
        sidebarProps: {
          displayText: 'Hashtag',
        },
      },
      {
        path: '/exam/statistic',
        element: <ExamStatistic />,
        state: 'exam.statistic',
        sidebarProps: {
          displayText: 'Thống kê',
        },
      },
    ],
  },
  {
    path: '/flashcard',
    element: <Outlet />,
    state: 'flashcard',
    sidebarProps: {
      displayText: 'Flashcard',
      icon: <AiFillCreditCard size={24} />,
    },
    child: [
      {
        index: true,
        path: '/flashcard/type',
        element: <FlashcardType />,
        state: 'flashcard.type',
        sidebarProps: {
          displayText: 'Loại flashcard',
        },
      },
      {
        path: '/flashcard/set',
        element: <FlashcardSetList />,
        state: 'flashcard.set',
        sidebarProps: {
          displayText: 'Bộ flashcard',
        },
      },
      {
        path: '/flashcard/set/:flashcardSetId',
        element: <FlashcardSetDetail />,
        state: 'flashcard.setDetail',
      },
      {
        path: '/flashcard/statistic',
        element: <FlashcardStatistic />,
        state: 'flashcard.statistic',
        sidebarProps: {
          displayText: 'Thống kê',
        },
      },
    ],
  },
];

export default appRoutes;
