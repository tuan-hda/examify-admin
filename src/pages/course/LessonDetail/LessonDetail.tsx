import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'redux/store';
import { colors } from 'theme';
import Topbar from '../../../components/common/Topbar';
import LessonForm from './LessonForm';

const LessonDetail = ({ type }: { type?: string }) => {
  const { courseId, chapterId, unitId, lessonId } = useParams();
  const { course } = useSelector((store: RootState) => store.course);

  if (!course) return null;
  const chapter = (course.chapterList || []).find(
    (chapter: any) => String(chapter.id) === String(chapterId)
  );
  if (!chapter) return null;
  const unit = (chapter.unitList || []).find((unit: any) => String(unit.id) === String(unitId));
  if (!unit) return null;

  const lesson = (unit.lessonList || []).find(
    (lesson: any) => String(lesson.id) === String(lessonId)
  );
  if (type !== 'create' && !lesson) return null;

  return (
    <Box pb="20px">
      <Topbar
        title={type === 'create' ? 'Tạo bài học' : 'Chi tiết bài học'}
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
            path: `/course/${courseId}/chapter/${chapterId}/unit/${unitId}`,
          },
          {
            name: type === 'create' ? 'Tạo bài học' : lesson.name,
          },
        ]}
        ribbonColor={colors.greenAccent[500]}
      />

      <Box mt="24px">
        <LessonForm isCreate={type === 'create'} lesson={lesson} />
      </Box>
    </Box>
  );
};

export default LessonDetail;
