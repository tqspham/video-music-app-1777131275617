'use client';

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onFullscreen: () => void;
  isMuted: boolean;
  onMute: () => void;
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onFullscreen,
  isMuted,
  onMute,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-slate-800 rounded-lg">
      <button
        onClick={onPrevious}
        className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200 text-white"
        aria-label="Previous video"
      >
        <SkipBack className="w-5 h-5" />
      </button>

      <button
        onClick={onPlayPause}
        className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" fill="currentColor" />
        ) : (
          <Play className="w-6 h-6" fill="currentColor" />
        )}
      </button>

      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200 text-white"
        aria-label="Next video"
      >
        <SkipForward className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      <button
        onClick={onMute}
        className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200 text-white"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={onFullscreen}
        className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200 text-white"
        aria-label="Fullscreen"
      >
        <Maximize className="w-5 h-5" />
      </button>
    </div>
  );
}