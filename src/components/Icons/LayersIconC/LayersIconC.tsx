type Props = {
  className: string;
};

const LayersIconC = ({ className }: Props) => {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.13333 8.2666L8 11.7333L13.8667 8.2666"
        stroke="#DC2626"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.13333 11.4666L8 14.9332L13.8667 11.4666"
        stroke="#475569"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.26659L2.13333 4.79992L8 1.33325L13.8667 4.79992L8 8.26659Z"
        stroke="#059669"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LayersIconC;
