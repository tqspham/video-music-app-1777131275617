'use client';

import { useRef, useState } from 'react';

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VolumeSlider({ volume, onVolumeChange }: VolumeSliderProps) {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(Math.max(0, Math.min(1, newVolume)));
  };

  return (
    <div className="w-full">
      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="w-full h-1 bg-slate-700 rounded-full cursor-pointer appearance-none accent-blue-600"
        aria-label="Volume control"
      />
    </div>
  );
}