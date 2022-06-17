import { SwipeableTransCard, TransCard } from 'components/UIElements';

type Props = {};

function SwipePage({}: Props) {
  return (
    <div className="mt-10 px-4 flex flex-col items-center gap-4">
      <SwipeableTransCard />
    </div>
  );
}

export default SwipePage;
