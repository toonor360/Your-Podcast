export {};

declare global {
  interface Window {
    CONFIG: { [key: `VITE_${string}`]: string };
  }
}
