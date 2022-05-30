import * as RadioGroup from '@radix-ui/react-radio-group';

type Props = {};

const RadioOptions = (props: Props) => {
  return (
    <RadioGroup.Root
      defaultValue="transactions"
      aria-label="Select view mode"
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        <RadioGroup.Item
          value="transactions"
          className="bg-white w-4 h-4 rounded-full shadow"
          id="transactions"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-slate-500" />
        </RadioGroup.Item>
        <label htmlFor="transactions" className="select-none">
          Transactions
        </label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroup.Item
          value="categories"
          className="bg-white w-4 h-4 rounded-full shadow"
          id="categories"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-slate-500" />
        </RadioGroup.Item>
        <label htmlFor="categories" className="select-none">
          Categories
        </label>
      </div>
    </RadioGroup.Root>
  );
};

export default RadioOptions;
