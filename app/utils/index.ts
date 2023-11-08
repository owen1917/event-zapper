import fetchEventFromRelays from "@/lib/nostr";
import { Event, Filter, nip19 } from "nostr-tools";

interface ParseNpubProfilePictureParams {
  npub: string;
  handleSetImg: (img: string) => void;
  handleSetName: (name: string) => void;
}

export const parseNpubProfilePicture = ({
  npub,
  handleSetImg,
  handleSetName,
}: ParseNpubProfilePictureParams) => {
  let decoded_npub;

  try {
    decoded_npub = nip19.decode(npub);
  } catch (e) {
    return;
  }

  const filter: Filter = {
    authors: [decoded_npub.data.toString()],
    kinds: [0],
  };

  fetchEventFromRelays(filter, (event: Event<0>) => {
    const content = JSON.parse(event.content);
    handleSetImg(content.picture);
    handleSetName(content.name);
  });
};
