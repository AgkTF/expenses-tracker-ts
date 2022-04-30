import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, DotsVerticalIcon, HomeIcon } from '@heroicons/react/solid';
import { AddTransactionModal } from 'components/UIElements';

type Props = {};

const BottomNavbar = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <div className="px-3 h-11 flex items-center justify-between bg-gray-600 rounded-lg">
        <Link
          to="/"
          className="p-2 rounded-full text-gray-200 hover:bg-gray-50 hover:text-gray-500"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>

        <button
          type="button"
          className="p-2 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 shadow-md"
          onClick={toggleModal}
        >
          <PlusIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="p-2 rounded-full text-gray-200 hover:bg-gray-50 hover:text-gray-500"
        >
          <DotsVerticalIcon className="h-5 w-5" />
        </button>
      </div>

      <AddTransactionModal toggleModal={toggleModal} isOpen={isModalOpen} />
    </>
  );
};

export default BottomNavbar;
