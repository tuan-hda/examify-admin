import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getCourseDetail } from 'redux/features/course/courseSlice';
import { AppDispatch } from 'redux/store';

const DetailLayout = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (courseId) dispatch(getCourseDetail(courseId));
  }, [courseId, dispatch]);

  return <Outlet />;
};

export default DetailLayout;
