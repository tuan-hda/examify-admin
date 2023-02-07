export interface INewFlashcardType {
  type: string;
  description: string;
}

export interface IFlashcardType extends INewFlashcardType {
  fc_type_id: number;
  sets_count: number;
  created_at: string;
  updated_at: string;
}

export interface IUpdateFlashcardType extends INewFlashcardType {
  id: number;
}

export interface INewFlashcardSet {
  name: string;
  description: string;
  fc_type_id: number;
}

export interface IFlashcardSet extends Omit<INewFlashcardSet, 'fc_type_id'> {
  fc_set_id: number;
  fc_type_id?: number;
  words_count: number;
  system_belong: boolean;
  access: string;
  views: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface IUpdateFlashcardSet extends INewFlashcardSet {
  id: number;
}

export interface INewFlashcard {
  fc_set_id: number;
  word: string;
  meaning: string;
  type_of_word: string;
  pronounce?: string;
  audio?: string;
  example?: string;
  note?: string;
  image?: string;
}

export interface IUpdateFlashcard extends INewFlashcard {
  fc_id: number;
  id: number;
}

export interface IFlashcard extends IUpdateFlashcard {
  created_by: number;
  created_at: string;
  updated_at: string;
}
