import { useEffect, useRef, type ReactNode } from 'react';

/**
 * A single-row, horizontally scrollable rail for category tiles.
 * - Never wraps: children stay on one line and scroll horizontally.
 * - Centred when the items fit; scrolls from the left when they overflow.
 * - Touch/trackpad scroll natively; a vertical mouse-wheel is translated to
 *   horizontal scroll on desktop so wheel users can browse the row too.
 * - Scrollbar is visually hidden; smooth scrolling + iOS momentum enabled.
 */
export function CategoryRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return; // nothing to scroll
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // already horizontal
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div
      ref={ref}
      className="-mx-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="mx-auto flex w-max flex-nowrap gap-5 sm:gap-8">{children}</div>
    </div>
  );
}
