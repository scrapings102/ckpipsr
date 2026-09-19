import React from 'react';
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
  // Repeat items 3 times for seamless 33.333% translation loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div className={`gc-col ${className}`}>
      <div
        className={`gc-track ${reverse ? "gc-anim-rev" : "gc-anim"}`}
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
