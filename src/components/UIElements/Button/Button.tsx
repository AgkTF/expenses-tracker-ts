import Spinner from '../Spinner/Spinner';

type Props = {
  type: 'button' | 'submit';
  className: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  label: string;
  onClickHandler?: () => void;
};

const Button = ({
  className,
  type,
  isDisabled,
  isLoading,
  loadingText,
  label,
  onClickHandler,
}: Props) => {
  return (
    <button
      type={type}
      className={`disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {isLoading && !loadingText && <Spinner classes="h-5 w-5" />}

      {isLoading && loadingText && (
        <>
          <Spinner classes="h-5 w-5" />
          <span>{loadingText}</span>
        </>
      )}

      {!isLoading && label}
    </button>
  );
};

export default Button;
