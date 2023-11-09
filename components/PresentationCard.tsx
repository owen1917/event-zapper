import QrCode from "@/components/QrCode";
import ZapList from "@/components/ZapList";
import Card from "@/types/Card";
import { nip19 } from "nostr-tools";
import { useEffect, useState } from "react";
import Bolt from "./Bolt";
import useStore from "./store";
function PresentationCard({
  speaker,
  setGlobal,
  globalAmount,
}: {
  speaker: Card;
  setGlobal: any;
  globalAmount: number;
}) {
  const [totalZaps, setTotalZaps] = useState(0);
  const speakers = useStore((state) => state.SpeakerCards);

  const showBool = speaker.id === speakers.length;

  let decodedDonationNpub;
  try {
    decodedDonationNpub = nip19.decode(speaker.donationNpub).data.toString();
  } catch (error) {}

  let decodedSpeakerNpub;
  try {
    decodedSpeakerNpub = nip19.decode(speaker.npub).data.toString();
  } catch (error) {
    console.log("cant decode speaker npub");
  }

  console.log(decodedSpeakerNpub);

  useEffect(() => {
    setGlobal((prev: any) => ({ ...prev, [speaker.npub]: totalZaps }));
  }, [totalZaps, setGlobal, speaker.npub]);

  return (
    <div className="flex flex-col items-center space-y-2 rounded-2xl shadow-md max-h-full flex-1 relative">
      <QrCode speaker={speaker} totalZaps={totalZaps} />
      {/* so compiler wont complain */}
      {(decodedDonationNpub || decodedSpeakerNpub) && (
        <ZapList
          npub={
            (speaker.donationNpub != ""
              ? decodedDonationNpub
              : decodedSpeakerNpub) as string
          }
          setter={setTotalZaps}
        />
      )}
      <div
        className={
          "flex justify-end text-2xl font-bold text-violet-600 w-full px-4 " +
          (showBool ? "" : "invisible")
        }
      >
        <Bolt />
        {globalAmount} Sats Zapped
      </div>
    </div>
  );
}
export default PresentationCard;
