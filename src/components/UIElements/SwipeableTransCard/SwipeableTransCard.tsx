import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function SwipeableTransCard() {
  const [{ x }, api] = useSpring(() => ({
    x: 0,
  }));

  const bind = useDrag(
    ({ down, movement: [mx] }) =>
      api.start({
        x: down ? mx : 0,
      }),
    {
      axis: 'x',
    }
  );

  return (
    <div className="relative w-full">
      <animated.div
        className="absolute z-10 h-[76px] px-3 py-4 w-full bg-gray-100 flex items-center justify-between gap-x-5 rounded-xl shadow cursor-grab touch-pan-y"
        {...bind()}
        style={{ x }}
      ></animated.div>

      <div className="absolute top-0 left-0 h-[76px] w-full bg-rose-100 flex items-center justify-between rounded-xl shadow overflow-hidden">
        <div className="h-full w-1/2 bg-red-500"></div>
        <div className="h-full w-1/2 bg-sky-500"></div>
      </div>
    </div>
  );
}
