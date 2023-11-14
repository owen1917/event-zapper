import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Bolt from "./Bolt";
import PresentationCard from "./PresentationCard";
import useStore from "./store";
function PresentationView() {
  const Speakers = useStore((state) => state.SpeakerCards);
  // if navigating back speakers should be loaded
  const [totalAmount, setTotalAmount] = useState<{ [key: string]: number }>({});
  // sum all zaps

  const amount = Object.values(totalAmount).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col h-full w-full">
      <div className={`flex space-x-2 flex-1 min-h-0`}>
        {Speakers.map((speaker) => (
          <PresentationCard
            key={speaker.id}
            speaker={speaker}
            setGlobal={setTotalAmount}
            globalAmount={amount}
          />
        ))}
      </div>
      <div
        className={
          "flex justify-end text-2xl font-bold text-violet-600 w-full px-4 "
        }
      >
        <Bolt />
        {amount} Sats Zapped
      </div>
      <Toaster />
    </div>
  );
}

export default PresentationView;
