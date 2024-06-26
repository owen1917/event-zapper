"use client";
import Card from "@/types/Card";
import Speaker from "@/types/Speaker";
import Image from "next/image";
import { useCallback } from "react";
import ActionBtn from "./ActionBtn";
import Header from "./Header";
import SpeakerCard from "./SpeakerCard";
import SpeakerPreviewCard from "./SpeakerPreviewCard";
import useStore from "./store";

const CreateSession = () => {
  const setSpeakerCards = useStore((state) => state.setSpeakerCards);

  const SpeakerCards: Array<Card> = useStore((state) => state.SpeakerCards);

  const addNewSpeaker = useCallback(
    (card: Speaker) => {
      setSpeakerCards({
        id: SpeakerCards.length + 1,
        name: card.name,
        npub: card.npub,
        donationNpub: card.donationNpub,
        imageSrc: card.imageSrc,
      });
    },
    [setSpeakerCards, SpeakerCards.length]
  );

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex items-center w-fit justify-center">
          <Image src="zap.svg" width="30" height="30" alt="" />
          <p className="font-bold text-violet-600 text-4xl block md:hidden">
            Event Zapper
          </p>
          <p className="font-bold text-violet-600 md:text-6xl hidden md:block">
            Event Zapper
          </p>
        </div>
      </div>
      <hr className="my-5 h-1 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <Header />
      {SpeakerCards.map((card) => {
        return (
          <div className="mb-4" key={card.name + card.id.toString()}>
            <SpeakerCard card={card} />
          </div>
        );
      })}

      <SpeakerPreviewCard addSpeaker={addNewSpeaker} />
      <div className="h-4"></div>
      <ActionBtn speakers={SpeakerCards.length} />
    </div>
  );
};

export default CreateSession;
