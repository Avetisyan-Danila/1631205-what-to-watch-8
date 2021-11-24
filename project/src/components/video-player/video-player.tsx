import {useState, useEffect, useRef} from 'react';

type AudioPlayerProps = {
  src: string;
  posterSrc: string;
}

function VideoPlayer({src, posterSrc}: AudioPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (parentRef.current === null) {
      return;
    }

    if (videoRef.current === null) {
      return;
    }

    if (parentRef.current !== null) {
      parentRef.current.addEventListener('mouseover', () => {
        const timer = setTimeout(() => {
          setIsPlaying(true);
        }, 1000);

        if (parentRef.current !== null) {
          parentRef.current.addEventListener('mouseout', () => {
            clearTimeout(timer);
            setIsPlaying(false);
          });
        }
      });
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.src = src;

  }, [isPlaying]);

  return (
    <div className='small-film-card__image' ref={parentRef}>
      <video poster={posterSrc} ref={videoRef} loop muted>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoPlayer;
