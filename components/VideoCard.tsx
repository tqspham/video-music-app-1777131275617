interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  audioUrl: string;
  thumbnail: string;
}

interface VideoCardProps {
  video: Video;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-slate-700">
      <div className="relative h-40 overflow-hidden bg-slate-600">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-0 group-hover:bg-opacity-100 flex items-center justify-center transition-all duration-300">
            <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24" aria-label="Play">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white font-medium">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-sm text-slate-300 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}