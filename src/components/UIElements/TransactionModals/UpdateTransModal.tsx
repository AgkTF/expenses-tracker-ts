import { XIcon } from '@heroicons/react/solid';
import format from 'date-fns/format';
import { useUpdateTrans, useFetchTrans } from 'hooks/useTransaction';
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
  transId: number;
  toggleModal: () => void;
};

const UpdateTransModal = ({ isOpen, transId, toggleModal }: Props) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: transactions,
    isSuccess,
  } = useFetchTrans(transId);

  const onSuccessHandler = (data: definitions['transaction'][]) => {
    const { id, amount, trans_type, category_id } = data[0];
    toast.success('Transaction added successfully');
    queryClient.invalidateQueries([
      'category_trans',
      format(testDate, 'LLLL'),
      `${category_id}`,
    ]);
    queryClient.invalidateQueries(['trans', id]);
    toggleModal();

    if (availableBalance && availableBalance.new_balance && amount) {
      const oldAmount = transactions ? transactions[0].amount : 0;
      const diff = amount - oldAmount;
      addBalanceRecordMutation.mutate({
        trans_id: id,
        old_balance: availableBalance.new_balance,
        new_balance:
          trans_type === 1
            ? availableBalance.new_balance - diff
            : availableBalance.new_balance + diff,
      });
    }
  };
  const addBalanceRecordMutation = useAddBalanceRecord();
  const updateTransMutation = useUpdateTrans(onSuccessHandler);

  const {
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
    data: availableBalance,
  } = useAvailableBalance();

  const onSubmit = (values: definitions['transaction']): void => {
    // console.log(values);
    updateTransMutation.mutate(values);
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      className="py-5 px-4 w-80 rounded-lg absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50"
      contentLabel="Add new transaction Modal"
    >
      <div className="mb-5 w-full flex items-center justify-between text-slate-600">
        <p className="font-semibold text-base">Edit transaction</p>
        <button onClick={() => toggleModal()}>
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <Form
        onSubmit={onSubmit}
        initialValues={
          !isLoading && isSuccess && transactions ? transactions[0] : {}
        }
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <TransactionForm
              toggleModal={toggleModal}
              values={values}
              isLoading={updateTransMutation.isLoading}
              pristine={pristine}
            />
          </form>
        )}
      />
    </Modal>
  );
};

export default UpdateTransModal;
