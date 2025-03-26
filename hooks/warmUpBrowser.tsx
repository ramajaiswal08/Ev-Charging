import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

const useWarmUpBrowser = () => {
  useEffect(() => {
    const warmUp = async () => {
      try {
        await WebBrowser.warmUpAsync();
      } catch (error) {
        console.error("Failed to warm up browser:", error);
      }
    };

    warmUp();

    return () => {
      WebBrowser.coolDownAsync().catch((error) =>
        console.error("Failed to cool down browser:", error)
      );
    };
  }, []);
};

export default useWarmUpBrowser;
