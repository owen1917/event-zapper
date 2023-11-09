import fetchEventFromRelays from "@/lib/nostr";
import { Event, Filter, nip19 } from "nostr-tools";

interface ParseNpubProfilePictureParams {
  npub: string;
  handleSetImg: (img: string) => void;
  handleSetName: (name: string) => void;
  handleLoading: (loading: boolean) => void;
  handleError: (error: string) => void;
  handleNpub: (npub: string) => void;
}

export const parseNpubProfilePicture = async ({
  npub,
  handleSetImg,
  handleSetName,
  handleLoading,
  handleError,
  handleNpub,
}: ParseNpubProfilePictureParams) => {
  let decoded_npub;
  handleLoading(true);

  try {
    decoded_npub = nip19.decode(npub);
  } catch (e) {
    handleLoading(false);
    handleError("Could not decode npub, please try again.");
    return;
  }

  const filter: Filter = {
    authors: [decoded_npub.data.toString()],
    kinds: [0],
  };

  await fetchEventFromRelays(filter, (event: Event<0>) => {
    const content = JSON.parse(event.content);
    handleSetImg(content.picture);
    handleSetName(content.name);
    handleLoading(false);
    handleError("");
    handleNpub(npub);
  });
};
