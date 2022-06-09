import { XIcon } from '@heroicons/react/solid';
import format from 'date-fns/format';
import useAddTransaction from 'hooks/useAddTransaction';
import {
  useAddBalanceRecord,
  useAvailableBalance,
} from 'hooks/useAvailableBalance';
import { Form } from 'react-final-form';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useQueryClient } from 'react-query';
import { definitions } from 'types/supabase';
import TransactionForm from './TransactionForm/TransactionForm';

Modal.setAppElement('#root');

const testDate = new Date();

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
};

const AddTransactionModal = ({ isOpen, toggleModal }: Props) => {
  const addBalanceRecordMutation = useAddBalanceRecord();
  const queryClient = useQueryClient();

  const {
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
    data: availableBalance,
  } = useAvailableBalance();

  const onSuccessHandler = (data: definitions['transaction'][]) => {
    const { id, amount, trans_type, category_id } = data[0];
    toast.success('Transaction added successfully');
    queryClient.invalidateQueries([
      'category_trans',
      format(testDate, 'LLLL'),
      `${category_id}`,
    ]);
    toggleModal();

    if (availableBalance && availableBalance.new_balance && amount) {
      addBalanceRecordMutation.mutate({
        trans_id: id,
        old_balance: availableBalance.new_balance,
        new_balance:
          trans_type === 1
            ? availableBalance.new_balance - amount
            : availableBalance.new_balance + amount,
      });
    }
  };

  const onErrorHandler = () => {
    toast.error('Failed to add transaction');
  };

  const addTransMutation = useAddTransaction(onSuccessHandler, onErrorHandler);

  const onSubmit = (values: definitions['transaction']): void => {
    addTransMutation.mutate(values);
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      className="py-5 px-4 w-80 rounded-lg absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50"
      contentLabel="Add new transaction Modal"
    >
      <div className="mb-5 w-full flex items-center justify-between text-slate-600">
        <p className="font-semibold text-base">Add new transaction</p>
        <button onClick={() => toggleModal()}>
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <Form
        onSubmit={onSubmit}
        initialValues={{ amount: '' }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <TransactionForm
              toggleModal={toggleModal}
              values={values}
              isLoading={addTransMutation.isLoading}
            />
          </form>
        )}
      />
    </Modal>
  );
};

export default AddTransactionModal;
