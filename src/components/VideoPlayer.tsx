'use client';

import { useState, useEffect } from 'react';

interface Server {
  name: string;
  url: string;
}

interface Props {
  servers: Server[];
}

export default function VideoPlayer({ servers }: Props) {
  const [selectedServer, setSelectedServer] = useState<string>(servers[0]?.url || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      setSelectedServer(servers[0].url);
    }
  }, [servers, selectedServer]);

  const handleServerChange = (url: string) => {
    setSelectedServer(url);
    setIsLoading(true);
    setError(null);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load video. Try another server.');
  };

  if (!servers || servers.length === 0) {
    return (
      <div className="video-container flex items-center justify-center bg-black">
        <p className="text-zinc-400 text-sm">No video servers available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Server Selection */}
      <div className="flex flex-wrap gap-2">
        {servers.map((server, index) => (
          <button
            key={server.url}
            onClick={() => handleServerChange(server.url)}
            className={`server-btn ${selectedServer === server.url ? 'active' : ''}`}
          >
            Server {index + 1}
          </button>
        ))}
      </div>

      {/* Video Container */}
      <div className="video-container">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <iframe
          src={selectedServer}
          title="Video Player"
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          loading="lazy"
        />
      </div>
    </div>
  );
}
