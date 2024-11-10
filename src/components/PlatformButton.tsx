import { FC } from "react";

interface PlatformButtonProps {
  name: string;
  link: string;
  icon: string;
}

export const PlatformButton: FC<PlatformButtonProps> = ({
  link,
  name,
  icon,
}) => {
  const iconHref = new URL(`../assets/platforms/${icon}`, import.meta.url).href;

  return (
    <a href={link} target="_blank">
      <img
        src={iconHref}
        alt={name}
        className="w-16 h-16 rounded-2xl hover:scale-105 transition-all shadow-lg"
      />
    </a>
  );
};
