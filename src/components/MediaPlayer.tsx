import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import closeIcon from "../assets/icons/close.svg";
import config from "../config.json";
import { MediaPlayerButtons } from "./MediaPlayerButtons";
import { MediaPlayerRange } from "./MediaPlayerRange";

interface MediaPlayerProps {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  playAudio: () => void;
  closeAudio: () => void;
  image?: string;
  title?: string;
}

export const MediaPlayer: FC<MediaPlayerProps> = ({
  audioRef,
  isPlaying,
  closeAudio,
  playAudio,
  image,
  title,
}) => {
  const [params] = useSearchParams();
  const [progress, setProgress] = useState<string>("0");
  const [currentTime, setCurrentTime] = useState<number>();

  const skipTime = (seconds: number = 10) => {
    if (!audioRef.current) return;

    if (
      audioRef.current.currentTime === audioRef.current.duration &&
      seconds > 0
    )
      return;

    audioRef.current.currentTime = Math.min(
      audioRef.current.duration,
      audioRef.current.currentTime + seconds
    );

    if (isPlaying) audioRef.current.play();
    setProgress(
      (
        (100 * audioRef.current.currentTime) /
        audioRef.current.duration
      ).toFixed(0)
    );
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    const episode = params.get("episode");

    if (!episode || !audioRef.current) return;

    audioRef.current.onloadedmetadata = () => {
      const currTime = sessionStorage.getItem(episode) || "0";
      audioRef.current!.currentTime = +currTime;

      setProgress(((100 * +currTime) / audioRef.current!.duration).toFixed(0));
      setCurrentTime(+currTime);
    };
  }, []);

  const logoHref = new URL(
    `../assets/logos/${image || config.logo}`,
    import.meta.url
  ).href;

  return (
    <section className="flex flex-col justify-content align-middle w-[30em] p-5 gap-2 relative mt-20 ml-5">
      <button onClick={closeAudio} className="absolute top-[-5px] right-2">
        <img
          src={closeIcon}
          alt="close"
          className="h-10 hover:scale-105 transition-all shadow-lg rounded-full"
        />
      </button>
      <div className="flex w-full justify-center">
        <div className="overflow-hidden w-48 h-48 aspect-square shadow-xl rounded-3xl bg-primary">
          <img src={logoHref} alt={config.title} />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center pt-5 pb-8">{title}</h1>
      <MediaPlayerRange
        {...{
          audioRef,
          currentTime,
          isPlaying,
          progress,
          setCurrentTime,
          setProgress,
        }}
      />
      <MediaPlayerButtons {...{ isPlaying, playAudio, skipTime }} />
    </section>
  );
};
