import React from 'react';
import EmptyContainer from '../EmptyContainer/EmptyContainer';
import Spinner from '../Spinner/Spinner';

type Props = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isEmptyData: boolean;
  emptyMessage: string;
  children: React.ReactNode;
};

const ResultsContainer = ({
  children,
  error,
  isError,
  isLoading,
  isEmptyData,
  emptyMessage,
}: Props) => {
  return (
    <>
      {isLoading && (
        <div className="mt-10">
          <Spinner classes="w-5 h-5 text-slate-500 mx-auto" />
        </div>
      )}

      {!isLoading && isEmptyData ? (
        <EmptyContainer message={emptyMessage} />
      ) : (
        children
      )}
    </>
  );
};

export default ResultsContainer;
