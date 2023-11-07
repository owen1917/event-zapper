import Speaker from "@/types/Speaker";
import Image from "next/image";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

const SpeakerPreviewCard = ({
  addSpeaker,
}: {
  addSpeaker: (name: Speaker) => void;
}) => {
  const [name, setName] = useState("");
  const [npubPrefix, setNpubPrefix] = useState("");
  const [donationNpubPrefix, setDonationNpubPrefix] = useState("");
  const [nostrProfileToggle, setNostrProfileToggle] = useState(true);

  const hasNpubAddress = Boolean(npubPrefix || donationNpubPrefix);

  const hasNostrDisabledRules = !hasNpubAddress;
  const anonDisabledRules = !name || !hasNpubAddress;
  const disabledRules = nostrProfileToggle
    ? hasNostrDisabledRules
    : anonDisabledRules;

  const fileInput = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState("dummy.svg");

  const handleAddSpeaker = useCallback(() => {
    addSpeaker({
      name,
      npub: npubPrefix,
      donationNpub: donationNpubPrefix,
      imageSrc,
    });

    // reset to default
    setImageSrc("dummy.svg");
    setNpubPrefix("");
    setDonationNpubPrefix("");
    setName("");
  }, [addSpeaker, name, npubPrefix, donationNpubPrefix, imageSrc]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col p-3 text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
      <div className="flex flex-row">
        <div className="flex flex-col space-y-3 items-center self-center justify-center p-3">
          <div>
            <Image
              src={imageSrc}
              alt="Picture of the author"
              className="object-cover rounded-full shrink-0 aspect-square max-h-[50%] self-start"
              width="100"
              height="100"
              onClick={() => fileInput.current!.click()}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="#fff"
              style={{ top: "-75", left: 0 }}
              className="w-6 h-6 relative rounded-full cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:border-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={(event) => handleImageUpload(event)}
              className="block w-full p-2  border border-gray-300 rounded-lg bg-red sm:text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="w-[100%] space-y-3">
          {!nostrProfileToggle && (
            <div>
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white"
              >
                {"Speaker's name"}
              </label>
              <input
                type="text"
                id="small-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full p-2  border border-gray-300 rounded-lg bg-red sm:text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          )}

          {nostrProfileToggle && (
            <div>
              <label
                htmlFor="small-input-2"
                className="block mb-2 text-sm font-medium text-white"
              >
                {"Speaker's public key (npub)"}
              </label>
              <input
                min={1}
                type="text"
                id="small-input-2"
                value={npubPrefix}
                onChange={(e) => setNpubPrefix(e.target.value)}
                className="block w-full p-2  border border-gray-300 rounded-lg bg-red sm:text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          )}
          {!nostrProfileToggle && (
            <div>
              <label
                htmlFor="small-input-3"
                className="block mb-2 text-sm font-medium text-white"
              >
                Donation public key (npub){" "}
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Zaps will go to this address instead"
                  className="cursor-pointer"
                  style={{
                    textShadow: "0 -1rem 1rem #a855f7, 0 1rem 2rem #000",
                  }}
                >
                  💡
                </a>
              </label>

              <Tooltip id="my-tooltip" />
              <input
                min={1}
                type="text"
                id="small-input-3"
                value={donationNpubPrefix}
                onChange={(e) => setDonationNpubPrefix(e.target.value)}
                className="block w-full p-2  border border-gray-300 rounded-lg bg-red sm:text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      <span className="text-sm font-medium text-gray-900 dark:text-gray-300 ml-auto my-2">
        Has nostr profile
      </span>
      <label className="relative inline-flex items-center cursor-pointer ml-auto">
        <input
          type="checkbox"
          checked={nostrProfileToggle}
          className="sr-only peer"
          onChange={(e) => setNostrProfileToggle(!nostrProfileToggle)}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>

      <button
        onClick={handleAddSpeaker}
        type="button"
        disabled={disabledRules}
        className="text-white mt-3 transition-all ease-in  bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5
         mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Add Speaker
      </button>
    </div>
  );
};

export default SpeakerPreviewCard;
