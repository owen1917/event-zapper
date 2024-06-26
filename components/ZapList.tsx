import ZapProps from "@/types/ZapProps";
import { insertEventIntoDescendingList } from "@/utils/insert";
import lightningPayReq from "bolt11";
import { Event, Filter, SimplePool } from "nostr-tools";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ZapTimeline from "./ZapTimeline/ZapTimeline";
import useStore from "./store";

function ZapList({
  npub,
  setter,
}: {
  npub: string;
  setter: Dispatch<SetStateAction<number>>;
}) {
  const eventStart = useStore((state) => state.sessionStart);

  const [zaps, setZaps] = useState<ZapProps[]>([]);
  const [immediateEvents, setImmediateEvents] = useState<Event[]>([]);
  const [events] = useDebounce(immediateEvents, 1000);

  function fetchEventFromRelays(
    filter: Filter,
    onEventReceived: CallableFunction
  ) {
    const pool = new SimplePool();

    const relays = useStore.getState().relays;

    const sub = pool.sub(relays, [filter]);

    sub.on("event", (event) => {
      onEventReceived(event);
    });

    sub.on("count", (count) => {
      console.log(`Relays: ${count}`);
    });
    return () => {
      console.log("unsubscribing");
      sub.unsub();
    };
  }

  useEffect(() => {
    fetchEventFromRelays(
      {
        kinds: [9735],
        since: Math.floor(eventStart.getTime() / 1000),
        "#p": [npub],
      },
      (event: Event) => {
        setImmediateEvents((prev) =>
          insertEventIntoDescendingList([...prev], event)
        );
      }
    );
  }, [eventStart, npub]);

  useEffect(() => {
    let zaps: ZapProps[] = [];
    events.forEach((event) => {
      const bolt11Tag = event.tags.find((tag) => tag[0] == "bolt11")!;
      const bolt11: string = bolt11Tag[1];
      const decoded = lightningPayReq.decode(bolt11);

      const amount = decoded.satoshis;
      let description;
      try {
        description = JSON.parse(
          event.tags.find((tag) => tag[0] == "description")![1]
        );
      } catch (error) {
        console.error("Failed to parse JSON:");
        return; // Skip this event and go to the next one
      }

      const senderPub = description.pubkey;

      const eTag = event.tags.find((tag) => tag[0] == "e");
      if (eTag) {
        console.log("e tag found");
        return; // Skip this event and go to the next one
      }

      // if e tag then its reaction to event, if no e tag then its a zap to person
      // https://github.com/nostr-protocol/nips/blob/master/57.md

      // doesnt work for some reason
      // if (eTag) {
      //   console.log('e tag found');
      //   return <></>
      // }
      zaps.push({
        amount: amount!,
        author: senderPub,
        text: event.content,
        created_at: event.created_at,
      });
    });
    setZaps(zaps);
  }, [events]);

  // get total amount of zaps
  const totalZaps = zaps.reduce((acc, zap) => acc + zap.amount, 0);
  setter(totalZaps);

  return (
    <div className="flex flex-col space-y-2 w-full px-2 py-4 overflow-y-auto h-full">
      <ZapTimeline zaps={zaps} />
    </div>
  );
}

export default ZapList;
