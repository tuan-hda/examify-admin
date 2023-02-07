import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState, useEffect } from 'react';
import TinyForm, { IValues } from '../TinyForm';
import LessonList from './LessonList';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { colors } from 'theme';
import { toast } from 'react-toastify';
import { deleteUnitService, updateUnitService } from 'api/course/course';
import { getCourseDetail } from 'redux/features/course/courseSlice';

const UnitDetail = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { courseId, chapterId, unitId } = useParams();
  const { course } = useSelector((store: RootState) => store.course);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.list) {
      setCurrentTab(2);
      location.state.list = false;
    }
  }, [location]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!courseId || !chapterId || !unitId || !course) return null;

  const chapter = (course.chapterList || []).find(
    (chapter: any) => String(chapter.id) === String(chapterId)
  );
  if (!chapter) return null;

  const unit = (chapter.unitList || []).find((unit: any) => String(unit.id) === String(unitId));
  if (!unit) return null;

  const handleUpdateUnit = async (data: IValues) => {
    try {
      await updateUnitService(unitId, chapterId, unit.numericOrder, data.name);
      dispatch(getCourseDetail(courseId));
      toast.success('Cập nhật khoá học thành công');
    } catch (error) {
      console.log('🚀 ~ file: UnitDetail.tsx:33 ~ handleUpdateUnit ~ error', error);
      toast.error('Cập nhật khoá học thất bại');
    }
  };

  const handleDeleteUnit = async () => {
    try {
      await deleteUnitService(unitId);
      dispatch(getCourseDetail(courseId));
      toast.success('Xoá chủ đề thành công');
      navigate(`/course/${courseId}/chapter/${chapterId}`, {
        state: {
          list: true,
        },
      });
    } catch (error) {
      console.log('🚀 ~ file: UnitDetail.tsx:50 ~ handleDeleteUnit ~ error', error);
      toast.error('Xoá chủ đề thất bại');
    }
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết chủ đề"
        breadcrumbs={[
          {
            name: 'Khoá học',
            path: '/course',
          },
          {
            name: course.name,
            path: '/course/' + courseId,
          },
          {
            name: chapter.name,
            path: `/course/${courseId}/chapter/${chapterId}`,
          },
          {
            name: unit.name,
          },
        ]}
        ribbonColor={colors.red[500]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách các bài học" />
      </Tabs>

      {currentTab === 1 ? (
        <Box
          maxWidth="600px"
          position="relative"
          left="50%"
          sx={{
            transform: 'translateX(-50%)',
          }}
        >
          <TinyForm
            handleDelete={handleDeleteUnit}
            data={unit}
            handleFormSubmit={handleUpdateUnit}
          />
        </Box>
      ) : (
        <LessonList lessonList={unit.lessonList} />
      )}
    </Box>
  );
};

export default UnitDetail;
