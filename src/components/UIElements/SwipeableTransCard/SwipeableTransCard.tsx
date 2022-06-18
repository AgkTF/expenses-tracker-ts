import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useSpring, animated } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react';
import { useEffect, useRef, useState } from 'react';

export default function SwipeableTransCard() {
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

  const [{ x }, api] = useSpring(() => ({
    x: 0,
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, dragging, movement: [mx] }) =>
        api.start({
          x: down ? mx : 0,
        }),
      onDragEnd: ({ movement: [mx] }) => {
        if (mx > 0 && mx > 0.75 * cardW) {
          console.log(mx, 'delete');
        } else if (mx < 0 && mx < 0.75 * cardW) {
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
        ></animated.div>

        <div className="absolute top-20 left-0 h-[76px] w-full bg-rose-100 flex items-center justify-between rounded-xl shadow overflow-hidden">
          <div className="px-4 h-full w-1/2 bg-red-500 flex items-center justify-start">
            <TrashIcon className="w-6 h-6 text-white" />
          </div>

          <div className="px-4 h-full w-1/2 bg-sky-500 flex items-center justify-end">
            <PencilIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}
