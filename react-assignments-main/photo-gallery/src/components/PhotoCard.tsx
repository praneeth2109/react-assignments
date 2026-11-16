import React, { useState } from "react";
import type { PhotoWithLikes } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface PhotoCardProps {
  photo: PhotoWithLikes;
  onLike: (id: string) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onLike }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimize image size from picsum by resizing to 800 width for fast loading
  // format: https://picsum.photos/id/{id}/800/500
  const optimizedUrl = `https://picsum.photos/id/${photo.id}/800/500`;

  return (
    <article className="photo-card">
      <div className="photo-img-wrapper">
        <img
          src={optimizedUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="photo-img"
          style={{ opacity: isLoaded ? 1 : 0.6 }}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            // Fallback to original download_url if resized fails
            (e.currentTarget as HTMLImageElement).src = photo.download_url;
          }}
        />
      </div>

      <div className="photo-info">
        <div className="photo-author">
          <span className="author-label">Photographer</span>
          <span className="author-name">{photo.author}</span>
        </div>

        {/* Fontawesome icon for thumbs up with click counter */}
        <button
          type="button"
          className={`like-button ${photo.likes > 0 ? "liked" : ""}`}
          onClick={() => onLike(photo.id)}
          title="Like photo"
          aria-label={`Like photo by ${photo.author}`}
        >
          <FontAwesomeIcon icon={faThumbsUp} className="like-icon" />
          <span className="like-count">{photo.likes}</span>
        </button>
      </div>
    </article>
  );
};
