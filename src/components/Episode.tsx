import { FC, useEffect, useState } from "react";
import pauseDark from "../assets/icons/pause-dark.svg";
import pauseLight from "../assets/icons/pause-light.svg";
import playDark from "../assets/icons/play-dark.svg";
import playLight from "../assets/icons/play-light.svg";
import { secondsToMinutes } from "../utils/funcitons";

interface EpisodeProps {
  isWhite: boolean;
  isSelected: boolean;
  isPlaying: boolean;
  title: string;
  description: string;
  uploadDate: string;
  file: string;
  startAudio: (epName: string) => () => void;
}

export const Episode: FC<EpisodeProps> = ({
  description,
  isPlaying,
  isWhite,
  title,
  startAudio,
  uploadDate,
  file,
  isSelected,
}) => {
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = new Audio(
      new URL(`../assets/audio/${file}`, import.meta.url).href
    );

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  }, []);

  return (
    <div
      className={`flex gap-4 rounded-2xl p-2 ${isSelected && "bg-primary"}`}
      id={file}
    >
      <audio />
      <button
        onClick={startAudio(file)}
        className={`rounded-full ${
          isWhite || isSelected ? "bg-secondary" : "bg-primary"
        } h-10 aspect-square text-center flex justify-center align-middle shadow-lg hover:scale-105 transition-all`}
      >
        <img
          src={
            isPlaying && isSelected
              ? isWhite || isSelected
                ? pauseLight
                : pauseDark
              : isWhite || isSelected
              ? playLight
              : playDark
          }
          alt="play"
        />
      </button>
      <div className="flex flex-col">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-ellipsis line-clamp-3">{description}</p>
        <p className="font-light mr-auto">
          {uploadDate} · {secondsToMinutes(duration)} minutes
        </p>
      </div>
    </div>
  );
};
