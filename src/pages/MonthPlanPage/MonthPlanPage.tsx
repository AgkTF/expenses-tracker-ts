import { MonthIcon } from 'components/UIElements';
import React from 'react';

type Props = {};

const MonthPlanPage = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-8 flex items-center justify-center">
        <MonthIcon />
        <h1 className="ml-3 font-bold text-xl text-slate-600">
          Plan Your Month
        </h1>
      </div>
    </div>
  );
};

export default MonthPlanPage;
