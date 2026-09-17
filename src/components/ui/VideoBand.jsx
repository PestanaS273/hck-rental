import useMotionAllowed from '../../hooks/useMotionAllowed'
import Parallax from '../../motion/Parallax'

// Banda a sangre con video mudo en bucle y parallax suave. Sin movimiento permitido, muestra el póster fijo.
export default function VideoBand({ video, className = '' }) {
  const playVideo = useMotionAllowed()
  if (!video) return null

  return (
    <div className={`reveal-media w-full bg-adobe-deep ${className}`}>
      <Parallax strength={14} className="h-full w-full">
        {playVideo ? (
          <video
            className="block h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={video.alt}
          />
        ) : (
          <img src={video.poster} alt={video.alt} loading="lazy" className="block h-full w-full object-cover" />
        )}
      </Parallax>
    </div>
  )
}
