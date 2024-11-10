import { FC, useEffect } from "react";
import { secondsToMinutes } from "../utils/funcitons";

interface MediaPlayerRangeProps {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  currentTime?: number;
  progress: string;
  isPlaying: boolean;
  setProgress: (progress: string) => void;
  setCurrentTime: (currentTime: number) => void;
}

export const MediaPlayerRange: FC<MediaPlayerRangeProps> = ({
  audioRef,
  currentTime,
  progress,
  isPlaying,
  setProgress,
  setCurrentTime,
}) => {
  const skipAudio = (percent: string) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = (+percent * audioRef.current.duration) / 100;

    if (isPlaying) audioRef.current.play();
    setProgress(percent);
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!audioRef.current?.duration || !audioRef.current.currentTime) return;

      const played =
        (100 * audioRef.current.currentTime) / audioRef.current.duration;
      setProgress(played.toFixed(0));
      setCurrentTime(audioRef.current.currentTime);
      sessionStorage.setItem(
        audioRef.current!.title,
        audioRef.current.currentTime.toString()
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <input
        id="small-range"
        type="range"
        value={progress}
        onChange={(e) => skipAudio(e.target.value)}
        min={0}
        max={100}
        style={{
          background: `linear-gradient(to right, black 0%, black ${progress}%, #0000007a ${progress}%, #0000007a 100%)`,
        }}
        className={`w-full h-1 rounded-lg appearance-none cursor-pointer px-0 accent-black`}
      />
      <div className="flex justify-between mt-[-5px] mx-[-8px] font-light text-sm">
        <p>{secondsToMinutes(currentTime)}</p>
        <p>-{secondsToMinutes(audioRef.current?.duration! - currentTime!)}</p>
      </div>
    </>
  );
};
