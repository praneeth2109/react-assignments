import { useState, useEffect, useRef, useCallback } from "react";
import type { PhotoItem, PhotoWithLikes } from "./types";
import { PhotoCard } from "./components/PhotoCard";

export function App() {
  const [photos, setPhotos] = useState<PhotoWithLikes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch photos from picsum paginated feed
  const fetchPhotos = useCallback(async (pageNum: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=10`);

      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.statusText}`);
      }

      const data: PhotoItem[] = await response.json();

      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          // Avoid duplicate photos if any
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems: PhotoWithLikes[] = data
            .filter((item) => !existingIds.has(item.id))
            .map((item) => ({
              ...item,
              likes: 0 // initialized to 0 per requirements
            }));
          return [...prev, ...newItems];
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error loading photos";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch for page 1
  useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  // Infinite Scroll using IntersectionObserver
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchPhotos(nextPage);
            return nextPage;
          });
        }
      },
      {
        root: null,
        rootMargin: "200px", // Trigger fetch 200px before reaching bottom
        threshold: 0.1
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, fetchPhotos]);

  // Handle Thumbs up like count increment
  const handleLike = useCallback((id: string) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
      )
    );
  }, []);

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>Photo Gallery</h1>
        <p>Single Page Infinite Scroll Feed</p>
      </header>

      {/* 1 Column View Photo Feed */}
      <main className="photo-feed">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} onLike={handleLike} />
        ))}
      </main>

      {/* Error state */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button
            type="button"
            className="retry-button"
            onClick={() => fetchPhotos(page)}
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state indicator */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner" />
          <p>Loading more photos...</p>
        </div>
      )}

      {/* End of feed message */}
      {!hasMore && (
        <div className="end-message">
          <p>You have reached the end of the gallery.</p>
        </div>
      )}

      {/* Sentinel element observed by IntersectionObserver */}
      <div ref={observerTarget} style={{ height: "20px" }} />
    </div>
  );
}

export default App;
