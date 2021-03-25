import React, { useEffect } from "react";
import { useMuteStore } from "../../webrtc/stores/useMuteStore";

interface MuteTitleUpdaterProps {}

export const MuteTitleUpdater: React.FC<MuteTitleUpdaterProps> = ({}) => {
  const { muted } = useMuteStore();
  useEffect(() => {
    if (muted) {
      document.title = "Muted | Goloka Vrindavan";
    } else {
      document.title = "Goloka Vrindavan";
    }
  }, [muted]);
  return null;
};
