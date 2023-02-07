import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getExamDetail } from 'redux/features/exam/examSlice';
import { AppDispatch } from 'redux/store';

const ExamLayout = () => {
  const { examId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (examId) dispatch(getExamDetail(Number(examId)));
  }, [examId, dispatch]);

  return <Outlet />;
};

export default ExamLayout;
