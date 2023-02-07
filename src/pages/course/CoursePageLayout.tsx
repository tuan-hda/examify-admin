import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const CoursePageLayout = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CoursePageLayout;
