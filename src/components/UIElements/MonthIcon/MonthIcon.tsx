import format from 'date-fns/format';

type Props = {
  date?: Date;
};

const MonthIcon = ({ date = new Date() }: Props) => {
  return (
    <div className="px-1 bg-gray-50 flex flex-col items-center justify-center rounded text-sm shadow-sm">
      <p className="font-semibold text-slate-500">{format(date, 'LLL')}</p>
      <p className="font-light text-slate-400">{format(date, 'yyyy')}</p>
    </div>
  );
};

export default MonthIcon;
