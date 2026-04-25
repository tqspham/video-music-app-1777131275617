import Link from 'next/link';
import { VideoList } from '@/components/VideoList';
import { EmptyState } from '@/components/EmptyState';

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
  videos: Video[];
}

async function getVideos(): Promise<Video[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/videos`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    const data: ApiResponse = await response.json();
    return data.videos;
  } catch {
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Video Player</h1>
          <p className="text-xl text-slate-300">Select a video to start watching</p>
        </div>

        {videos.length === 0 ? (
          <EmptyState />
        ) : (
          <VideoList videos={videos} />
        )}
      </div>
    </main>
  );
}