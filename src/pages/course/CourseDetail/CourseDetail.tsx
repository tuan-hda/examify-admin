import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState, useEffect } from 'react';
import CourseForm, { IValues } from './CourseForm';
import ChapterList from './ChapterList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { colors } from 'theme';
import { IEditCourse } from 'api/course/courseInterface';
import { deleteCourseService, updateCourseService } from 'api/course/course';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCourseDetail } from 'redux/features/course/courseSlice';

const CourseDetail = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { course } = useSelector((store: RootState) => store.course);
  const { courseId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const isList = location?.state?.list;

  useEffect(() => {
    if (location?.state?.list) {
      setCurrentTab(2);
      location.state.list = false;
    }
  }, [isList, location]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleDelete = async () => {
    if (courseId)
      try {
        await deleteCourseService(courseId);
        toast.success('Xoá khoá học thành công');
        navigate('/course');
      } catch (error) {
        console.log('🚀 ~ file: CourseDetail.tsx:29 ~ handleDelete ~ error', error);
        toast.error('Xoá khoá học thất bại');
      }
  };

  const handleFormSubmit = async (data: IValues) => {
    if (courseId) {
      try {
        const {
          pointReward,
          pointToUnlock,
          price,
          discount,
          courseType,
          courseTitle,
          ...restData
        } = data;
        const newData: IEditCourse = {
          name: courseTitle,
          pointToUnlock: Number(pointToUnlock),
          pointReward: Number(pointReward),
          price: Number(price),
          discount: Number(discount),
          charges: courseType === 'paid',
          id: courseId,
          ...restData,
        };
        // Check type before submit
        if (newData.charges) {
          newData.pointToUnlock = 0;
        } else {
          newData.price = 0;
          newData.discount = 0;
        }

        await updateCourseService(newData);
        toast.success('Cập nhật khoá học thành công');
        // dispatch(updateCourse(newData));
        // console.log(response);
        dispatch(getCourseDetail(courseId));
      } catch (error) {
        console.log('🚀 ~ file: CourseCreatePage.tsx:9 ~ handleFormSubmit ~ error', error);
      }
    }
  };

  if (!course) return null;

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết khoá học"
        breadcrumbs={[
          {
            name: 'Khoá học',
            path: '/course',
          },
          {
            name: course.name,
          },
        ]}
        ribbonColor={colors.primary[400]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách các chương" />
      </Tabs>

      {currentTab === 1 ? (
        <CourseForm
          handleDelete={handleDelete}
          handleFormSubmit={handleFormSubmit}
          course={course}
        />
      ) : (
        <ChapterList chapterList={course.chapterList} />
      )}
    </Box>
  );
};

export default CourseDetail;
