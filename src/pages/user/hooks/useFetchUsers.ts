import { IUser } from 'api/users/userInterface';
import { getUsersService } from 'api/users/users';
import { useState, useEffect, useCallback } from 'react';

const useFetchUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getUsersService();
      setUsers(
        response.data.map((item: IUser) => ({
          ...item,
          id: item.user_id,
        }))
      );
    } catch (error: any) {
      console.log('🚀 ~ file: useFetchUsers.ts:12 ~ fetchData ~ error', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { users, fetchData };
};

export default useFetchUsers;
