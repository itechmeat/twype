import { useCallback } from "react";

export const useUserMedia = () => {
  if (!navigator?.mediaDevices) return null;
  const hasUserMedia = useCallback(async () => {
    return await navigator?.mediaDevices?.getUserMedia({
      audio: true,
      video: true,
    });
  }, []);
  return hasUserMedia();
};
