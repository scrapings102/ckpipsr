import React, { useLayoutEffect, useRef, useState } from 'react';
import { LaneItem } from './campusLifeData';

interface GalleryColumnProps {
  items: LaneItem[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  onSelect: (url: string) => void;
}

export default function GalleryColumn({
  items,
  reverse = false,
  duration = 30,
  className = "",
  onSelect
}: GalleryColumnProps) {
  // Repeated 3 times for a seamless 33.333% loop, but only when two sets fill
  // the stage. A column with one or two photos would otherwise show the same
  // photo stacked three times with an empty gap below, so it shows them once.
  const trackRef = useRef<HTMLDivElement>(null);
  const [loops, setLoops] = useState(false);
  const displayItems = loops ? [...items, ...items, ...items] : items;

  // Measured with a single set on screen, before the browser paints, and again
  // when the window is resized (a hidden column measures nothing until shown).
  useLayoutEffect(() => {
    setLoops(false);
  }, [items]);
  useLayoutEffect(() => {
    const track = trackRef.current;
    const stage = track?.parentElement?.parentElement;
    if (!track || !stage || loops) return;
    const measure = () => {
      const room = parseFloat(getComputedStyle(stage).maxHeight) || stage.clientHeight;
      if (track.offsetHeight > 0 && track.offsetHeight * 2 >= room) setLoops(true);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [items, loops]);

  return (
    <div className={`gc-col ${className}`}>
      <div
        ref={trackRef}
        className={`gc-track ${loops ? (reverse ? "gc-anim-rev" : "gc-anim") : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="gc-card"
            onClick={() => onSelect(item.url)}
          >
            <div className="gc-imgwrap">
              <span className="gc-tag">{item.tag}</span>
              <img
                src={item.url}
                alt={item.caption}
                className="gc-img"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="gc-info">
              <h4>{item.caption}</h4>
              <div className="gc-snap">
                <span className="gc-star">✦</span>
                <span>Snap #{item.originalId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
