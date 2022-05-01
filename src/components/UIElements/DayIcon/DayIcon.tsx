import format from 'date-fns/format';

type Props = {
  date?: Date;
  fontSize?: string;
};

const DayIcon = ({ date = new Date(), fontSize = 'text-sm' }: Props) => {
  return (
    <div
      className={`px-1 bg-white text-gray-500 group-hover:bg-gray-500 group-hover:text-white flex flex-col items-center justify-center rounded shadow-sm ${fontSize}`}
    >
      <p className="font-semibold ">{format(new Date(date), 'd')}</p>
      <p className="font-light">{format(new Date(date), 'LLL')}</p>
    </div>
  );
};

export default DayIcon;
