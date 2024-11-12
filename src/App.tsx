import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Episode } from "./components/Episode";
import { MediaPlayer } from "./components/MediaPlayer";
import { PlatformButton } from "./components/PlatformButton";
import { PodcastTitle } from "./components/PodcastTitle";
import config from "./config.json";

export const App: FC = () => {
  const [isWhite, setIsWhite] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [params, setParams] = useSearchParams();
  const [selectedEpisodeName, setSelectedEpisodeName] = useState<string | null>(
    null
  );

  const playAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const startAudio = (epName: string) => () => {
    const epTitle = audioRef.current?.title;

    if (epTitle === epName) {
      playAudio();
      return;
    }

    audioRef.current!.src = new URL(
      `./assets/audio/${epName}`,
      import.meta.url
    ).href;
    audioRef.current!.title = epName;

    setSelectedEpisodeName(epName);

    const currTime = sessionStorage.getItem(epName);
    audioRef.current?.play();
    audioRef.current!.currentTime = currTime ? +currTime : 0;
    setIsPlaying(true);
    setIsWhite(false);

    if (params.get("episode") !== epName) setParams({ episode: epName });
  };

  useEffect(() => {
    console.log("An Omer Luf Application");
    const episode = params.get("episode");

    if (!episode || !audioRef.current) {
      setParams({});
      return;
    }

    audioRef.current!.src = new URL(
      `./assets/audio/${episode}`,
      import.meta.url
    ).href;
    audioRef.current.title = episode;

    setSelectedEpisodeName(episode);
    setIsWhite(false);

    document.getElementById(episode)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setParams({ episode });
  }, []);

  const closeAudio = () => {
    audioRef.current?.pause();
    audioRef.current!.src = "";
    audioRef.current!.title = "";
    setIsPlaying(false);
    setIsWhite(true);
    setSelectedEpisodeName(null);

    setParams({});
  };

  const logoHref = new URL(`./assets/logos/${config.logo}`, import.meta.url)
    .href;

  const selectedEpisode = config.episodes.find(
    (selectedEpisode) => selectedEpisode.file === selectedEpisodeName
  );

  return (
    <main
      className={`${
        isWhite ? "bg-primary" : "bg-secondary"
      } w-screen h-screen flex text-black transition-all`}
    >
      {isWhite && (
        <section className="xl:ml-[20%] ml-[4%] w-auto flex justify-end pr-16 overflow-auto pt-20">
          <div className="overflow-hidden w-64 h-64 aspect-square shadow-xl rounded-3xl bg-primary">
            <img src={logoHref} alt={config.title} />
          </div>
        </section>
      )}
      <section
        className={`${
          !isWhite && "xl:ml-[25%] ml-[4%]"
        } flex flex-col gap-10 xl:max-w-[30%] max-w-[50%] transition-all overflow-auto pb-5 no-scrollbar pt-16`}
      >
        <PodcastTitle {...config} />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">Give us a listen on</h1>
          <div className="flex gap-5 px-1">
            {config.platforms.map((platform) => (
              <PlatformButton key={platform.name} {...platform} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-2xl">Episodes</h1>
          {config.episodes.map((episode) => (
            <Episode
              key={episode.file}
              {...{
                isWhite,
                isPlaying,
                startAudio,
                isSelected: selectedEpisodeName === episode.file,
                ...episode,
              }}
            />
          ))}
        </div>
      </section>
      {!isWhite && (
        <MediaPlayer
          {...{
            audioRef,
            closeAudio,
            isPlaying,
            playAudio,
            title: selectedEpisode?.title,
            image: selectedEpisode?.image,
          }}
        />
      )}
      <audio ref={audioRef} />
    </main>
  );
};
