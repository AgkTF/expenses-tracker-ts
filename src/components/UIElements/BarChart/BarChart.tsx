import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import format from 'date-fns/format';

type Props = {
  data: {
    expenses: number;
    day: string;
  }[];
};

// const data = [
//   {
//     day: 'Sun',
//     expenses: 100,
//   },
//   {
//     day: 'Mon',
//     expenses: 70,
//   },
//   {
//     day: 'Tue',
//     expenses: 300,
//   },
//   {
//     day: 'Wed',
//     expenses: 400,
//   },
//   {
//     day: 'Thu',
//     expenses: 550,
//   },
//   {
//     day: 'Fri',
//     expenses: 120,
//   },
//   {
//     day: 'Sat',
//     expenses: 730,
//   },
// ];

const BarChart = ({ data }: Props) => {
  return (
    <ResponsiveBar
      data={data}
      keys={['expenses']}
      // indexBy="day"
      indexBy={data => {
        return format(new Date(data.day), 'eee dd');
      }}
      groupMode="grouped"
      colors="#cbd5e1"
      borderRadius={4}
      enableGridY={false}
      margin={{ top: 10, right: 20, bottom: 25, left: 20 }}
      padding={0.25}
      axisLeft={null}
      theme={{
        fontFamily: 'inter',
        fontSize: 12,
        tooltip: { container: { fontSize: 12 } },
      }}
      onClick={(props, e) => {
        console.log(props);
      }}
    />
  );
};

export default BarChart;
