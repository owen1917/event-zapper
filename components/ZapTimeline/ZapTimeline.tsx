import ZapProps from "@/types/ZapProps";
import ZapTimelineItem from "./ZapTimelineItem";

interface Props {
  zaps: ZapProps[];
}

const ZapTimeline = ({ zaps }: Props) => {
  return (
    <ol className="relative border-l border-gray-700 mx-5">
      {zaps.map((zap, index) => {
        return <ZapTimelineItem key={index} zap={zap} />;
      })}
    </ol>
  );
};

export default ZapTimeline;
