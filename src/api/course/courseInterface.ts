export interface INewCourse {
  name: string;
  image: string;
  level: string;
  charges: boolean;
  pointToUnlock: number;
  pointReward: number;
  price: number;
  discount: number;
  achieves: string;
  description: string;
  createBy: number;
}

export interface IEditCourse extends Omit<INewCourse, 'createBy'> {
  id: number | string;
}

export interface INewLesson {
  unitId: number;
  numericOrder: number;
  name: string;
  type: number;
  videoUrl: string;
  videoTime: number;
  flashcardSetId: number;
  text: string;
  description: string;
}

export interface IEditLesson extends INewLesson {
  id: number;
}
