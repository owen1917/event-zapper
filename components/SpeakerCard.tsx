import fetchEventFromRelays from "@/lib/nostr";
import Card from "@/types/Card";
import Image from "next/image";
import { Event, Filter, nip19 } from "nostr-tools";
import { useCallback, useEffect, useState } from "react";
import useStore from "./store";

function SpeakerCard({ card }: { card: Card }) {
  const [npub, setNpub] = useState(card.npub);
  const [donationNpub, setDonationNpub] = useState(card.donationNpub);
  const [imageSrc, setImageSrc] = useState(card.imageSrc);
  const [name, setName] = useState(card.name);
  // const fileInput = useRef<HTMLInputElement>(null);

  const modifySpeakerCard = useStore((state) => state.modifySpeakerCard);
  const removeSpeakerCard = useStore((state) => state.removeSpeakerCard);

  useEffect(() => {
    let decoded_npub;
    try {
      decoded_npub = nip19.decode(npub);
    } catch (e) {
      modifySpeakerCard({
        npub,
        donationNpub,
        imageSrc,
        name: npub,
        id: card.id,
      });
      return;
    }

    const filter: Filter = {
      authors: [decoded_npub.data.toString()],
      kinds: [0],
    };

    fetchEventFromRelays(filter, (event: Event<0>) => {
      const content = JSON.parse(event.content);
      setImageSrc(content.picture);
      setName(content.name);
    });
  }, [npub, donationNpub, imageSrc, name, card.id, modifySpeakerCard]);

  useEffect(() => {
    modifySpeakerCard({ npub, donationNpub, imageSrc, name, id: card.id });
  }, [donationNpub, imageSrc, modifySpeakerCard, npub, name, card.id]);

  const handleRemoveSpeaker = useCallback(() => {
    removeSpeakerCard(card.id);
  }, [removeSpeakerCard, card.id]);

  return (
    <div className="flex items-center justify-start space-x-5  relative p-3 text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500  focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
      <div className="flex flex-col space-y-3 items-center ml-4">
        <Image
          src={`${imageSrc}`}
          alt="Picture of the author"
          className="object-cover rounded-full shrink-0 aspect-square max-h-[50%]"
          width="100"
          height="100"
        />
        {imageSrc === "/dummy.svg" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#008000"
            className="w-12 h-12 absolute top-0 left-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        ) : null}
        <div className="font-bold text-sm text-white">{name}</div>
      </div>
      <div className="flex flex-col space-y-4 justify-center w-full">
        {npub && (
          <label className="block mb-2 text-sm font-medium text-white">
            npub:
            <input
              value={card.npub}
              className="block w-full p-2  border border-gray-300 rounded-lg bg-red sm:text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50"
              type="text"
              disabled={true}
            />
          </label>
        )}
        {donationNpub && (
          <label className="block mb-2 text-sm font-medium text-white">
            Donation public key:
            <input
              value={card.donationNpub}
              className="block w-full p-2  border border-gray-300 rounded-lg bg-red sm:text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50"
              type="text"
              disabled={true}
            />
          </label>
        )}
      </div>
      <div
        className="self-end text-xs shadow-lg cursor-pointer"
        style={{
          textShadow: "0 -1rem 1rem #a855f7, 0 1rem 2rem #000",
        }}
        onClick={handleRemoveSpeaker}
      >
        🗑️
      </div>
    </div>
  );
}

export default SpeakerCard;
