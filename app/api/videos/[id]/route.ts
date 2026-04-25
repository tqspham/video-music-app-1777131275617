export const runtime = 'nodejs';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  audioUrl: string;
  thumbnail: string;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Mountain Hiking Adventure',
    description: 'Experience breathtaking mountain views and outdoor exploration.',
    duration: 450,
    videoUrl: 'https://loremflickr.com/1280/720/mountain',
    audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    thumbnail: 'https://loremflickr.com/320/180/mountain',
  },
  {
    id: '2',
    title: 'Ocean Waves Documentary',
    description: 'Discover the beauty and power of ocean waves.',
    duration: 600,
    videoUrl: 'https://loremflickr.com/1280/720/ocean',
    audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    thumbnail: 'https://loremflickr.com/320/180/ocean',
  },
  {
    id: '3',
    title: 'Forest Escape',
    description: 'A peaceful journey through ancient forests and nature trails.',
    duration: 480,
    videoUrl: 'https://loremflickr.com/1280/720/forest',
    audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    thumbnail: 'https://loremflickr.com/320/180/forest',
  },
  {
    id: '4',
    title: 'Desert Sunset',
    description: 'Watch the sun set over endless desert landscapes.',
    duration: 300,
    videoUrl: 'https://loremflickr.com/1280/720/desert',
    audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    thumbnail: 'https://loremflickr.com/320/180/desert',
  },
  {
    id: '5',
    title: 'Northern Lights',
    description: 'Witness the magical aurora borealis in all its glory.',
    duration: 540,
    videoUrl: 'https://loremflickr.com/1280/720/aurora',
    audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    thumbnail: 'https://loremflickr.com/320/180/aurora',
  },
  {
    id: '6',
    title: 'Urban Exploration',
    description: 'Explore stunning architecture and vibrant city life.',
    duration: 420,
    videoUrl: 'https://loremflickr.com/1280/720/city',
    audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    thumbnail: 'https://loremflickr.com/320/180/city',
  },
];

interface ApiResponse {
  video: Video | null;
}

interface RouteParams {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  const { id } = await params;

  const video = MOCK_VIDEOS.find((v) => v.id === id) || null;

  const response: ApiResponse = {
    video,
  };

  const statusCode = video ? 200 : 404;

  return Response.json(response, {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}