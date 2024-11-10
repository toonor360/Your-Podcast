// function that takes seconds and returns time in mm:ss format
export const secondsToMinutes = (seconds: number = 0): string => {
  const minutes = Math.floor((seconds || 0) / 60);
  const remainingSeconds = (seconds || 0) % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds.toFixed(0)}`;
};
