interface LoadingSpinnerProps {
  isLoading: boolean;
}

export function LoadingSpinner({ isLoading }: LoadingSpinnerProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="status" aria-label="Loading">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-600" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
      </div>
    </div>
  );
}