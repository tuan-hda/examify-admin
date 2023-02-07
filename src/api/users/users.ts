import axiosBase from 'api/axios';

export function getUsersService() {
  return axiosBase.get('/users');
}

export function changePermissionService(user_id: number, role_id: number) {
  return axiosBase.put('/users/change-role', {
    user_id,
    role_id,
  });
}

export function getUserStatisticsService() {
  return axiosBase.get('/users/statistics');
}

export function getUserDetailStatisticsService(year: number) {
  return axiosBase.get('/users/statistics/detail', {
    params: { year },
  });
}
