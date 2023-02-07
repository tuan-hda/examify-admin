import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState, useEffect } from 'react';
import TinyForm, { IValues } from '../TinyForm';
import UnitList from './UnitList';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from 'theme';
import { deleteChapterService, updateChapterService } from 'api/course/course';
import { toast } from 'react-toastify';
import { getCourseDetail } from 'redux/features/course/courseSlice';

const ChapterDetail = () => {
  const { courseId, chapterId } = useParams();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { course } = useSelector((store: RootState) => store.course);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.list) {
      location.state.list = false;
      setCurrentTab(2);
    }
  }, [location]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!course) return null;

  const chapter = (course.chapterList || []).find(
    (chapter: any) => String(chapter.id) === String(chapterId)
  );

  if (!chapter) return null;

  const unitList = chapter.unitList;

  const handleUpdateChapter = async (data: IValues) => {
    if (courseId && chapterId)
      try {
        await updateChapterService(chapterId, courseId, chapter.numericOrder, data.name);
        toast.success('Cập nhật chương thành công');
        dispatch(getCourseDetail(courseId));
      } catch (error) {
        toast.error('Cập nhật chương thất bại');
        console.log('🚀 ~ file: ChapterDetail.tsx:34 ~ handleUpdateChapter ~ error', error);
      }
  };

  const handleDeleteChapter = async () => {
    if (chapterId && courseId) {
      try {
        await deleteChapterService(chapterId);
        dispatch(getCourseDetail(courseId));
        toast.success('Xoá chương thành công');
        navigate(`/course/${courseId}`, {
          state: {
            list: true,
          },
        });
      } catch (error) {
        console.log('🚀 ~ file: ChapterDetail.tsx:58 ~ handleDeleteChapter ~ error', error);
        toast.error('Xoá chương thất bại');
      }
    }
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết chương"
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
          },
        ]}
        ribbonColor={colors.orange[400]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách các chủ đề" />
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
            handleDelete={handleDeleteChapter}
            data={chapter}
            handleFormSubmit={handleUpdateChapter}
          />
        </Box>
      ) : (
        <UnitList unitList={unitList} />
      )}
    </Box>
  );
};

export default ChapterDetail;
