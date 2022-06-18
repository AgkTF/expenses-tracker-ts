import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useEffect, useRef, useState } from 'react';
import { DayIcon, UpdateTransModal } from 'components/UIElements';
import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { useStore } from 'store/useStore';
import { Link } from 'react-router-dom';
import CN from 'classnames';
import format from 'date-fns/format';

type Props = {
  id: number;
  date: Date;
  description: string;
  categoryName: string;
  amount: number;
  categoryId: number;
  transType: number;
};

export default function SwipeableTransCard({
  id,
  date,
  description,
  categoryName,
  amount,
  categoryId,
  transType,
}: Props) {
  const defaultCurrency = useStore(state => state.currency);
  const moneyClasses = CN('font-semibold text-xl', {
    'text-red-500': transType === 1,
    'text-green-600': transType === 2,
  });

  const divRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);

  useEffect(() => {
    if (divRef) {
      const refCurr = divRef.current;

      const boundingRec = refCurr?.getBoundingClientRect();

      console.log(boundingRec);
      setCardW(boundingRec?.width || 0);
    }
  }, []);

  const [{ x, background, trashOpacity, penOpacity }, api] = useSpring(() => ({
    x: 0,
    background: '#fff',
    trashOpacity: 1,
    penOpacity: 1,
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx] }) =>
        api.start({
          x: down ? mx : 0,
          background: mx > 0 ? '#ef4444' : '#0ea5e9',
          trashOpacity: mx > 0 ? 1 : 0,
          penOpacity: mx < 0 ? 1 : 0,
        }),
      onDragEnd: ({ movement: [mx] }) => {
        if (mx > 0 && mx > 0.6 * cardW) {
          console.log(mx, 'delete');
        } else if (mx < 0 && mx < 0.6 * cardW) {
          console.log(mx, 'edit');
        }
      },
    },
    {
      drag: {
        axis: 'x',
      },
    }
  );

  return (
    <>
      <div className="relative w-full">
        <animated.div
          className="absolute z-10 h-[76px] px-3 py-4 w-full bg-gray-400 flex items-center justify-between gap-x-5 rounded-xl shadow cursor-grab touch-pan-y"
          {...bind()}
          style={{ x }}
          ref={divRef}
        >
          <div className="flex items-center gap-x-3">
            <div>
              <DayIcon date={date} />
            </div>

            <div>
              <p className="text-slate-500 font-medium text-base">
                {description}
              </p>

              <p className="px-1 mt-1 w-fit bg-white text-slate-400 font-light text-xs shadow rounded text-center">
                {categoryName}
              </p>

              <Link
                to={`/categories/${encodeURIComponent(
                  categoryName
                )}/${categoryId}/${format(date, 'yyyy-LL-dd')}`}
              >
                <p className="px-1 mt-1 w-fit bg-white text-slate-400 font-light text-xs shadow rounded text-center">
                  {categoryName}
                </p>
              </Link>
            </div>
          </div>

          <div className={moneyClasses}>
            {moneyFormatter(amount, defaultCurrency)}
          </div>
        </animated.div>

        {/* // * The icons below */}
        <animated.div
          className="absolute px-4 top-0 left-0 h-[76px] w-full flex items-center justify-between rounded-xl shadow overflow-hidden"
          style={{ background }}
        >
          <animated.div
            style={{
              opacity: trashOpacity,
            }}
          >
            <TrashIcon className="w-6 h-6 text-white" />
          </animated.div>

          <animated.div
            style={{
              opacity: penOpacity,
            }}
          >
            <PencilIcon className="w-6 h-6 text-white" />
          </animated.div>
        </animated.div>
      </div>
    </>
  );
}
