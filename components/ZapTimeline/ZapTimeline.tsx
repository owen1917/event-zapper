import ZapProps from "@/types/ZapProps";
import { useEffect, useMemo } from "react";
import toast, { ToastPosition } from "react-hot-toast";

interface Props {
  zaps: ZapProps[];
}

const ZapTimeline = ({ zaps }: Props) => {
  const toastOptions = useMemo(() => {
    return {
      duration: 2000,
      position: "top-center" as ToastPosition,

      // Styling
      style: { backgroundColor: "violet" },

      // Custom Icon
      icon: "⚡",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    };
  }, []);

  useEffect(() => {
    zaps.forEach((zap) => {
      console.log(zap);
      toast(`${zap.amount} from ${zap.author}`, toastOptions);
    });
  }, [toastOptions, zaps]);

  return (
    <ol className="relative border-l border-gray-700 mx-5">
      {/* {zaps.map((zap, index) => {
        return <ZapTimelineItem key={index} zap={zap} />;
      })} */}
    </ol>
  );
};

export default ZapTimeline;
