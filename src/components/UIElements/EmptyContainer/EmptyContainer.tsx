type Props = {
  message: string;
};

const EmptyContainer = ({ message }: Props) => {
  return (
    <p className="mt-10 text-red-300 mx-auto font-medium text-sm text-center">
      {message}
    </p>
  );
};

export default EmptyContainer;
