'use client';

import { X } from 'lucide-react';

interface ErrorMessageProps {
  error: string | null;
  onDismiss: () => void;
}

export function ErrorMessage({ error, onDismiss }: ErrorMessageProps) {
  if (!error) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" role="alert" aria-live="assertive">
      <div className="bg-red-900 border-2 border-red-700 rounded-lg p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-red-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-100 mb-2">Error Loading Video</h3>
            <p className="text-red-200 text-sm mb-4">{error}</p>
          </div>
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-red-300 hover:text-red-100 transition-colors duration-200"
            aria-label="Dismiss error message"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}