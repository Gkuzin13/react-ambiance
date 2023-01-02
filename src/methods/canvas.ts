export const drawCanvasFromMedia = (
  canvasElement: HTMLCanvasElement | null,
  mediaElement: HTMLImageElement | HTMLVideoElement | null,
  width: number,
  height: number
) => {
  if (!canvasElement || !mediaElement) return;

  const ctx = canvasElement.getContext('2d');
  ctx?.drawImage(mediaElement, 0, 0, width, height);
};