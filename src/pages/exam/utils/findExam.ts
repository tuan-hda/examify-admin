import { IExam } from '../../../api/exam/examInterface';
export function findPart(detail: IExam, partId?: number | string) {
  if (!partId) return;
  return detail.parts?.find((item) => item.id === Number(partId));
}
