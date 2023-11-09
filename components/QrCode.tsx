import Speaker from "@/types/Speaker";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import useStore from "./store";

function QrCode({
  speaker,
  totalZaps,
}: {
  speaker: Speaker;
  totalZaps: number;
}) {
  const value =
    speaker.donationNpub != "" ? speaker.donationNpub : speaker.npub;
  const QRCodeSize = useStore((state) => state.QRCodeSize);
  const npubPrefix = useStore((state) => state.npubPrefix);
  return (
    <div
      style={{ width: `${QRCodeSize}%` }}
      className="p-2 rounded-3xl shadow-sm aspect-square max-w-full"
    >
      <div className="flex items-center space-x-5">
        <div className="flex flex-col items-center">
          <div className="flex">
            <div className="text-3xl text-fuchsia-600">{totalZaps}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFF00"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFA500"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>

          <Image
            src={speaker.imageSrc}
            alt="Picture of the author"
            className="object-cover rounded-full shrink-0 aspect-square"
            width="200"
            height="200"
          />
          <p className="text-3xl text-fuchsia-600">{speaker.name}</p>
        </div>

        <QRCodeSVG className="w-full h-full" value={npubPrefix + value} />
      </div>
    </div>
  );
}

export default QrCode;
