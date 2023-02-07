import { Box } from '@mui/material';
import { createNewCourseService } from 'api/course/course';
import { INewCourse } from 'api/course/courseInterface';
import Topbar from 'components/common/Topbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from 'redux/store';
import CourseForm, { IValues } from './CourseDetail/CourseForm';

const CourseCreatePage = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  const handleFormSubmit = async (data: IValues) => {
    if (user.userId)
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
        const newData: INewCourse = {
          name: courseTitle,
          pointToUnlock: Number(pointToUnlock),
          pointReward: Number(pointReward),
          price: Number(price),
          discount: Number(discount),
          charges: courseType === 'paid',
          createBy: user.userId,
          ...restData,
        };
        // Check type before submit
        if (newData.charges) {
          newData.pointToUnlock = 0;
        } else {
          newData.price = 0;
          newData.discount = 0;
        }

        const response = await createNewCourseService(newData);
        toast.success('Tạo khoá học thành công');
        navigate('/course/' + response.data.data.id);
      } catch (error) {
        console.log('🚀 ~ file: CourseCreatePage.tsx:9 ~ handleFormSubmit ~ error', error);
      }
  };

  return (
    <Box pb="20px">
      <Topbar title="Tạo khoá học" />
      <div style={{ marginTop: '20px' }}></div>

      <CourseForm isCreate handleFormSubmit={handleFormSubmit} />
    </Box>
  );
};

export default CourseCreatePage;
