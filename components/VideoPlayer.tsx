'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { PlaybackControls } from '@/components/PlaybackControls';
import { ProgressBar } from '@/components/ProgressBar';
import { VolumeSlider } from '@/components/VolumeSlider';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  audioUrl: string;
  thumbnail: string;
}

interface VideoPlayerProps {
  video: Video;
}

interface PlaybackState {
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentTime: 0,
    isPlaying: false,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  // Restore playback position from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem(`playback-${video.id}`);
    if (savedTime) {
      const time = parseFloat(savedTime);
      if (videoRef.current && audioRef.current) {
        videoRef.current.currentTime = time;
        audioRef.current.currentTime = time;
      }
    }
  }, [video.id]);

  // Save playback position to localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        localStorage.setItem(`playback-${video.id}`, videoRef.current.currentTime.toString());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [video.id]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setError('You appear to be offline. Please check your internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync video and audio playback
  useEffect(() => {
    if (!videoRef.current || !audioRef.current) return;

    const syncAudio = () => {
      if (audioRef.current && videoRef.current) {
        const timeDiff = Math.abs(videoRef.current.currentTime - audioRef.current.currentTime);
        if (timeDiff > 0.2) {
          audioRef.current.currentTime = videoRef.current.currentTime;
        }
      }
    };

    const video = videoRef.current;
    video.addEventListener('timeupdate', syncAudio);
    return () => video.removeEventListener('timeupdate', syncAudio);
  }, []);

  // Handle play/pause synchronization
  useEffect(() => {
    if (!videoRef.current || !audioRef.current) return;

    if (playbackState.isPlaying) {
      const playPromises = [videoRef.current.play(), audioRef.current.play()];
      Promise.all(playPromises).catch(() => {
        setError('Failed to start playback.');
      });
    } else {
      videoRef.current.pause();
      audioRef.current.pause();
    }
  }, [playbackState.isPlaying]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playbackState.isMuted ? 0 : playbackState.volume;
    }
  }, [playbackState.volume, playbackState.isMuted]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!playerContainerRef.current?.contains(document.activeElement as Node) && e.target !== document.body) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          setPlaybackState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
            if (audioRef.current) {
              audioRef.current.currentTime = videoRef.current.currentTime;
            }
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
            if (audioRef.current) {
              audioRef.current.currentTime = videoRef.current.currentTime;
            }
          }
          break;
        default:
          break;
      }
    },
    [duration]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handlePlayPause = () => {
    if (!isOnline) {
      setError('Cannot play while offline.');
      return;
    }
    setPlaybackState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleSeek = (time: number) => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.currentTime = time;
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setPlaybackState((prev) => ({ ...prev, volume: newVolume, isMuted: false }));
  };

  const handleMute = () => {
    setPlaybackState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleFullscreen = async () => {
    if (!playerContainerRef.current) return;

    try {
      if (playbackState.isFullscreen) {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } else {
        await playerContainerRef.current.requestFullscreen();
      }
      setPlaybackState((prev) => ({ ...prev, isFullscreen: !prev.isFullscreen }));
    } catch (err) {
      setError('Fullscreen mode is not available.');
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPlaybackState((prev) => ({
        ...prev,
        currentTime: videoRef.current?.currentTime || 0,
      }));
    }
  };

  const handleVideoError = () => {
    setError('Failed to load video. Please try a different video or check your internet connection.');
    setIsLoading(false);
  };

  const handleAudioError = () => {
    setError('Failed to load audio track. Please try again.');
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  return (
    <div ref={playerContainerRef} className="w-full bg-black rounded-lg overflow-hidden shadow-2xl">
      <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
        <video
          ref={videoRef}
          src={video.videoUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onError={handleVideoError}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          className="absolute inset-0 w-full h-full"
          aria-label={`Video player for ${video.title}`}
        />
        <audio
          ref={audioRef}
          src={video.audioUrl}
          onError={handleAudioError}
          aria-label="Synchronized audio track"
        />

        {isLoading && <LoadingSpinner isLoading={true} />}
        {error && (
          <ErrorMessage
            error={error}
            onDismiss={() => setError(null)}
          />
        )}

        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-between pointer-events-none">
          <div className="pointer-events-auto p-4 text-white">
            <h2 className="text-lg font-bold mb-1">{video.title}</h2>
            <p className="text-sm text-slate-300">{video.description}</p>
          </div>

          <div className="pointer-events-auto space-y-3 p-4">
            <ProgressBar
              currentTime={playbackState.currentTime}
              duration={duration}
              onSeek={handleSeek}
            />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <button
                  onClick={handlePlayPause}
                  className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200 text-white"
                  aria-label={playbackState.isPlaying ? 'Pause' : 'Play'}
                >
                  {playbackState.isPlaying ? (
                    <Pause className="w-5 h-5" fill="currentColor" />
                  ) : (
                    <Play className="w-5 h-5" fill="currentColor" />
                  )}
                </button>

                <button
                  onClick={handleMute}
                  className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200 text-white"
                  aria-label={playbackState.isMuted ? 'Unmute' : 'Mute'}
                >
                  {playbackState.isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <div className="w-24">
                  <VolumeSlider
                    volume={playbackState.volume}
                    onVolumeChange={handleVolumeChange}
                  />
                </div>
              </div>

              <button
                onClick={handleFullscreen}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200 text-white"
                aria-label={playbackState.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {playbackState.isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}