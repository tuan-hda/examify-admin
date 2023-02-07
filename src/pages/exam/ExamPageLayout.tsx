import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const ExamPageLayout = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ExamPageLayout;
