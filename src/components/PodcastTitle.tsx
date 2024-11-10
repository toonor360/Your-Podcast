import { FC } from "react";

interface PodcastTitleProps {
  title: string;
  tags: string[];
  description: string;
  subDescription: string;
}

export const PodcastTitle: FC<PodcastTitleProps> = ({
  description,
  title,
  subDescription,
  tags,
}) => (
  <div className="flex flex-col gap-3">
    <h1 className="text-6xl font-bold">{title}</h1>
    <div className="flex align-center gap-1 max-w-full flex-wrap">
      {tags.map((tag, i) => (
        <div
          key={i}
          className={`bg-black rounded-2xl px-3 py-0.5 text-white text-nowrap`}
        >
          {tag}
        </div>
      ))}
    </div>
    <div className="pt-2 text-lg">
      <p className="text-xl">{description}</p>
      <p className="pt-1 font-light">{subDescription}</p>
    </div>
  </div>
);
