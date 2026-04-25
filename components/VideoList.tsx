'use client';

import Link from 'next/link';
import { VideoCard } from '@/components/VideoCard';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  audioUrl: string;
  thumbnail: string;
}

interface VideoListProps {
  videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Link key={video.id} href={`/player/${video.id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
}