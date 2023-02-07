export interface IUser {
  id?: number;
  mail: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  avt: string;
  banner: string;
  description: string;
  accumulated_point: number;
  rank_point: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  role_name: string;
  rank_name: string;
  role_id: number;
  rank_id: number;
}

export const initialUser: IUser = {
  id: -1,
  mail: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  phone_number: '',
  avt: '',
  banner: '',
  description: '',
  accumulated_point: 0,
  rank_point: 0,
  created_at: '',
  updated_at: '',
  user_id: -1,
  role_id: -1,
  rank_id: -1,
  role_name: 'Student',
  rank_name: '',
};
