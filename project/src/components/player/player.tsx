import {useState, useEffect, useRef} from 'react';
import {useParams, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {Film} from '../../types/film';
import {AppRoute} from '../../const';

type PlayerProps = {
  films: Film[];
}

type RouteParams = {
  id: string;
}

function Player(props: PlayerProps): JSX.Element {
  const {films} = props;
  const {id} = useParams<RouteParams>();
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressTime, setprogressTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const film = films[Number(id) - 1];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = videoRef.current;

  function getTimeFromSeconds(seconds: number) {
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    return `${h>10?h:'0'+h}:${m>10?m:'0'+m}:${s}`;
  };

  useEffect(() => {
    if (video === null) {
      return;
    }

    if (isPlaying) {
      video.play();
      return;
    }

    if (!isPlaying) {
      video.pause();
      return;
    }
  }, [isPlaying]);

  return (
    <div className="player">
      <video className="player__video" poster={film.backgroundImage} ref={videoRef} onEnded={() => {video === null ? '' : video.currentTime = 0; setIsPlaying(false)}} onTimeUpdate={() => { setprogressTime(video === null ? 0 : (Math.round(video.currentTime) * 100) / Math.round(video.duration)); setTimeLeft(video === null ? 0 : Math.round(video.duration) - (Math.round(video.currentTime)))}}><source src={film.videoLink} type="video/mp4" /></video>

      <Link onClick={() => history.push(AppRoute.Film)} to={id}><button type="button" className="player__exit">Exit</button></Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progressTime} max="100"></progress>
            <div className="player__toggler" style={{left: `${progressTime}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{video === null ? '' : getTimeFromSeconds(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          {
            isPlaying === false ?
            <button type="button" className="player__play" onClick={() => setIsPlaying(true)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            :
            <button type="button" className="player__play" onClick={() => setIsPlaying(false)}>
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
          </button>
          }
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={() => video?.requestFullscreen()}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;