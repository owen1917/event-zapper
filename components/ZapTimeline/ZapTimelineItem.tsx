import Metadata from "@/types/Metadata";
import ZapProps from "@/types/ZapProps";
import Image from "next/image";
import { useSubscribe } from "nostr-hooks";
import useStore from "../store";

interface ZapTimelineItemProps {
  zap: ZapProps;
}

import { format } from "date-fns";

const ZapTimelineItem = ({ zap }: ZapTimelineItemProps) => {
  const relays = useStore((state) => state.relays);
  const { events } = useSubscribe({
    relays,
    filters: [
      {
        kinds: [0],
        authors: [zap.author],
      },
    ],
  });

  function formatSeconds(seconds: number) {
    const date = new Date(seconds * 1000);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  }

  if (events.length === 0) {
    return <></>;
  }
  const content: Metadata = JSON.parse(events[0].content);
  console.log("content", content);
  const createdAt = formatSeconds(events[0].created_at);

  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8  ring-gray-900 bg-blue-900">
        <Image
          className="object-cover rounded-full shrink-0 aspect-square"
          src={content.picture ? content.picture : "/dummy.svg"}
          alt="picture of author"
          width={100}
          height={100}
        />
      </span>
      <div className="items-center justify-center p-4  border  rounded-lg shadow-sm sm:flex bg-gray-700 border-gray-600">
        <time className="ml-auto mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
          {createdAt}
        </time>
        <div className="text-sm font-normal  text-gray-300 my-1">
          <span className="text-[#a855f7]">{content.name}</span> zapped{" "}
          <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
            ⚡ {zap.amount} ⚡
          </span>
        </div>

        <blockquote className="p-i my-2 border-l-4 b bg-gray-400 border-gray-500 bg-gray-800">
          <p className="text-xs p-2 italic font-medium leading-relaxed text-white">
            {zap.text}
          </p>
        </blockquote>
      </div>
    </li>
  );
};

export default ZapTimelineItem;
