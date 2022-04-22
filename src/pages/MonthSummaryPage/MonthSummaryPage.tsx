import { MonthIcon } from 'components/UIElements';
import useFetchOpeningBalance from 'hooks/useFetchOpeningBalance';

type Props = {};

const MonthSummaryPage = (props: Props) => {
  const { isLoading, isError, data, error } = useFetchOpeningBalance(
    new Date('11/11/2021')
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-8 flex items-center justify-center">
          <MonthIcon />
          <h1 className="ml-3 font-bold text-xl text-slate-600">
            Month Summary
          </h1>
        </div>
      </div>
    </>
  );
};

export default MonthSummaryPage;
