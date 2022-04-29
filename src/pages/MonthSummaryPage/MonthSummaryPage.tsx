import { BalanceCard, MonthIcon } from 'components/UIElements';
import useFetchOpeningBalance from 'hooks/useFetchOpeningBalance';
import useExpensesDetails from 'hooks/useExpensesDetails';
import useMonthTrans from 'hooks/useMonthTrans';

type Props = {};

const testDate = new Date('11/11/2021');

const MonthSummaryPage = (props: Props) => {
  const {
    isLoading: isOpeningBalanceLoading,
    isError: isOpeningBalanceError,
    error: openingBalanceError,
    data: openingBalance,
  } = useFetchOpeningBalance(testDate);

  const {
    isLoading: isExpensesLoading,
    isError: isExpensesError,
    error: expensesError,
    data: expensesData,
  } = useExpensesDetails(testDate);

  const {
    isLoading: isMonthTransLoading,
    isError: isMonthTransError,
    error: monthTransError,
    data: monthTrans,
  } = useMonthTrans(testDate);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-8 flex items-center justify-center">
          <MonthIcon />
          <h1 className="ml-3 font-bold text-xl text-slate-600">
            Month Summary
          </h1>
        </div>

        <div className="mt-8">
          {openingBalance && expensesData && monthTrans && (
            <BalanceCard
              availableBalance={openingBalance - monthTrans?.totalSpent}
              totalSpent={monthTrans?.totalSpent}
              budget={expensesData?.totalExpenses}
              percentage={
                (monthTrans?.totalSpent / expensesData?.totalExpenses) * 100
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MonthSummaryPage;
