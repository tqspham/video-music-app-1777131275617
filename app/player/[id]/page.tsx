'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { VideoPlayer } from '@/components/VideoPlayer';
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

interface ApiResponse {
  video: Video | null;
}

export default function PlayerPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.id as string;

  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/videos/${videoId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video');
        }
        const data: ApiResponse = await response.json();
        if (!data.video) {
          throw new Error('Video not found');
        }
        setVideo(data.video);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading the video');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <LoadingSpinner isLoading={true} />
      </main>
    );
  }

  if (error || !video) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6 p-4">
        <ErrorMessage
          error={error || 'Video not found'}
          onDismiss={() => router.push('/')}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          ← Back to Videos
        </button>
        <VideoPlayer video={video} />
      </div>
    </main>
  );
}