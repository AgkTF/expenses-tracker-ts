import {
  BalanceCard,
  ExpenseCard,
  IncomeCard,
  MonthIcon,
  ResultsContainer,
} from 'components/UIElements';
import useExpensesCategoriesDetails from 'hooks/useExpensesCategoriesDetails';
import useMonthTrans from 'hooks/useMonthTrans';
import useIncomeDetails from 'hooks/useIncomeDetails';
import { useAvailableBalance } from 'hooks/useAvailableBalance';
import { isEmpty } from 'lodash';

type Props = {};

const testDate = new Date();

const MonthSummaryPage = (props: Props) => {
  const {
    isLoading: isExpensesLoading,
    isError: isExpensesError,
    error: expensesError,
    data: expensesData,
  } = useExpensesCategoriesDetails(testDate);

  const {
    isLoading: isIncomeLoading,
    isError: isIncomeError,
    error: incomeError,
    data: incomeData,
  } = useIncomeDetails(testDate);

  const {
    isLoading: isMonthTransLoading,
    isError: isMonthTransError,
    error: monthTransError,
    data: monthTrans,
  } = useMonthTrans(testDate);

  const {
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
    data: availableBalance,
  } = useAvailableBalance();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <section className="mt-8 flex items-center justify-center">
          <MonthIcon />
          <h1 className="ml-3 font-bold text-xl text-slate-600">
            Month Summary
          </h1>
        </section>

        <div className="mt-8">
          {availableBalance && expensesData && monthTrans && (
            <BalanceCard
              availableBalance={availableBalance.new_balance || 0}
              totalSpent={monthTrans?.totalSpent}
              budget={expensesData?.totalExpenses}
              percentage={
                (monthTrans?.totalSpent / expensesData?.totalExpenses) * 100
              }
            />
          )}
        </div>

        <h2 className="mt-9 font-semibold text-xl text-slate-600 text-center">
          My Budget
        </h2>

        <section className="pb-1 w-full relative overflow-y-auto transactions__container">
          <div className="py-4 sticky top-0 z-20 bg-white w-full px-4 flex items-center justify-between">
            <h3 className="font-medium text-lg text-slate-600">💸 Expenses</h3>
          </div>

          <ResultsContainer
            error={expensesError}
            isError={isExpensesError}
            isLoading={isExpensesLoading}
            isEmptyData={isEmpty(expensesData?.categories)}
            emptyMessage="No categories found!"
          >
            <div className="px-4 w-full flex flex-wrap items-center justify-between gap-2">
              {expensesData?.categories.map(entry => (
                <ExpenseCard
                  key={entry.id}
                  categoryId={entry.id}
                  category={entry.name || ''}
                  spent={entry.totalSpent}
                  transCount={entry.transCount}
                  budget={entry.plannedAmount || 0}
                  remaining={
                    entry.plannedAmount
                      ? entry.plannedAmount - entry.totalSpent
                      : 0
                  }
                  percentage={entry.percentage}
                />
              ))}
            </div>
          </ResultsContainer>
        </section>

        <section className="mt-4 w-full relative overflow-y-auto transactions__container">
          <div className="py-4 sticky top-0 z-20 bg-white w-full px-4 flex items-center justify-between">
            <h3 className="font-medium text-lg text-slate-600">💰 Income</h3>
          </div>

          <ResultsContainer
            error={incomeError}
            isError={isIncomeError}
            isLoading={isIncomeLoading}
            isEmptyData={isEmpty(incomeData?.categories)}
            emptyMessage="No categories found!"
          >
            <div className="px-4 w-full flex flex-wrap items-center justify-between gap-2">
              {incomeData?.categories.map(entry => (
                <IncomeCard
                  key={entry.id}
                  categoryId={entry.id}
                  budget={entry.budget || 0}
                  category={entry.name || ''}
                  collected={entry.totalCollected}
                />
              ))}
            </div>
          </ResultsContainer>
        </section>
      </div>
    </>
  );
};

export default MonthSummaryPage;
