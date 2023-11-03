import { useCallback, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import useStore from "./store";

const Header = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const setRelays = useStore((state) => state.setRelays);
  const relays = useStore((state) => state.relays);

  const [tempRelays, setTempRelays] = useState<Array<string>>([""]);

  const onHandleRelayChange = useCallback(
    (e: any) => {
      //(e) => setRelays(e.target.value.split(","))
      setTempRelays(e.target.value.split(","));
    },
    [setTempRelays]
  );

  const onSaveRelays = useCallback(() => {
    setRelays(tempRelays);
    onCloseModal();
  }, [setRelays, tempRelays]);

  return (
    <div className="flex items-center justify-center space-x-3 mb-5">
      <button onClick={onOpenModal}>
        <p className="text-white">⚙️ Relays</p>
      </button>
      <label className=" text-white">
        <a
          href="https://github.com/owen1917/event-zapper#readme"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>💡 Help</button>
        </a>
      </label>

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "w-[80%]",
        }}
      >
        <label className="text-sm font-bold">
          Relays (separated by comma):
        </label>
        <input
          className="p-2 rounded flex flex-col items-center w-[80%]"
          type="text"
          value={!!tempRelays[0] ? tempRelays.join(",") : relays}
          onInput={onHandleRelayChange}
        />

        <button
          onClick={onSaveRelays}
          type="button"
          className="text-white mt-3 transition-all ease-in  bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5
         mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Save
        </button>
      </Modal>
    </div>
  );
};

export default Header;
