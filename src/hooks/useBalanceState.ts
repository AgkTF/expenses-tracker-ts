import useFetchOpeningBalance from './useFetchOpeningBalance';
import { useAvailableBalance } from './useAvailableBalance';

export default function useBalanceState(date: Date) {
  const {
    isLoading: isOpeningBalanceLoading,
    isError: isOpeningBalanceError,
    error: openingBalanceError,
    data: openingBalance,
  } = useFetchOpeningBalance(date);

  const {
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
    data: availableBalance,
  } = useAvailableBalance();

  if (
    !isBalanceLoading &&
    !isOpeningBalanceLoading &&
    openingBalance &&
    availableBalance
  ) {
    const diff = (availableBalance.new_balance || 0) - openingBalance;

    if (diff > 0) {
      return 'isUp';
    }

    return 'isDown';
  }
}
