type Props = {
  percentage: number;
  height?: number | string;
};

const ProgressBar = ({ percentage, height = 6 }: Props) => {
  return (
    <div className="relative w-full bg-gray-50 rounded">
      <div
        className={`rounded ${
          percentage > 100 ? 'bg-red-400' : 'bg-slate-400'
        }`}
        style={{
          width: `${percentage > 100 ? 100 : percentage}%`,
          height: `${height}px`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
