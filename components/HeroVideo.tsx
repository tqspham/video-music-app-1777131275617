export function HeroVideo() {
  return (
    <div className="w-full mb-12">
      <div className="rounded-lg overflow-hidden shadow-2xl bg-black">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4"
            className="absolute inset-0 w-full h-full"
            controls
            loop
            muted
            aria-label="Featured video"
          >
            <p className="text-white p-4">
              Your browser does not support the HTML5 video tag. Please update your browser to watch videos.
            </p>
          </video>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Featured Video</h2>
        <p className="text-slate-300">Watch our latest content</p>
      </div>
    </div>
  );
}
