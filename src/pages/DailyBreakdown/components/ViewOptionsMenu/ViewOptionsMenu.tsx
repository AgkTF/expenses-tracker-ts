import { DotsHorizontalIcon } from '@heroicons/react/solid';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import RadioOptions from './RadioOptions/RadioOptions';

type Props = {
  viewOption: string;
  onValueChangeHandler: (value: string) => void;
};

const ViewOptionsMenu = ({ onValueChangeHandler, viewOption }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="p-1 text-slate-700 bg-slate-100 rounded-full shadow"
        >
          <DotsHorizontalIcon className="h-5 w-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={10}
        className="py-2 bg-slate-100 rounded-md text-slate-500 font-medium shadow-md min-w-[288px]"
      >
        <div className="px-2 mb-2">
          <RadioOptions />
        </div>

        <hr className="bg-slate-300" />

        <div className="relative px-8">
          <DropdownMenu.Label className="py-2 text-xs text-slate-400">
            View Options
          </DropdownMenu.Label>

          <DropdownMenu.RadioGroup
            value={viewOption}
            onValueChange={onValueChangeHandler}
            className="space-y-2"
          >
            <DropdownMenu.RadioItem
              value="separate"
              className="flex items-center gap-2"
            >
              <DropdownMenu.ItemIndicator className="w-4 justify-center absolute left-2 inline-flex">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Expense vs Income
            </DropdownMenu.RadioItem>

            <DropdownMenu.RadioItem
              value="combined"
              className="flex items-center gap-2"
            >
              <DropdownMenu.ItemIndicator className="w-4 justify-center absolute left-2 inline-flex">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Transaction Breakdown
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ViewOptionsMenu;
