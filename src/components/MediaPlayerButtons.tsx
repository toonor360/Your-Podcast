import { FC } from "react";
import forward from "../assets/icons/forward.svg";
import pauseDark from "../assets/icons/pause-dark.svg";
import playDark from "../assets/icons/play-dark.svg";
import replay from "../assets/icons/replay.svg";

interface MediaPlayerButtonProps {
  isPlaying: boolean;
  playAudio: () => void;
  skipTime: (seconds: number) => void;
}

export const MediaPlayerButtons: FC<MediaPlayerButtonProps> = ({
  isPlaying,
  playAudio,
  skipTime,
}) => {
  return (
    <div className="flex w-full justify-center align-middle gap-8">
      <button
        onClick={() => skipTime(-10)}
        className={`rounded-full bg-primary h-14 aspect-square text-center flex justify-center align-middle shadow-lg p-1 hover:scale-105 transition-all`}
      >
        <img src={replay} alt="replay" />
      </button>
      <button
        onClick={playAudio}
        className={`rounded-full bg-primary h-14 aspect-square text-center flex justify-center align-middle shadow-lg hover:scale-105 transition-all`}
      >
        <img src={isPlaying ? pauseDark : playDark} alt="play" />
      </button>
      <button
        onClick={() => skipTime(10)}
        className={`rounded-full bg-primary h-14 aspect-square text-center flex justify-center align-middle shadow-lg p-1 hover:scale-105 transition-all`}
      >
        <img src={forward} alt="forward" />
      </button>
    </div>
  );
};
