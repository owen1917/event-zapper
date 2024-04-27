import { useCallback, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Tooltip } from "react-tooltip";
import { About } from "./constants";
import useStore from "./store";

const Header = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [open2, setOpen2] = useState(false);

  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);

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
        <button onClick={onOpenModal2}>
          <p className="text-white">💡 Help</p>
        </button>
      </label>

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "w-[80%] bg-gray-900 text-white p-5",
          closeButton: "fill-white",
        }}
      >
        <label className="text-sm font-bold">
          Relays (separated by comma):
        </label>
        <a
          data-tooltip-id="my-tooltip2"
          data-tooltip-content="Relays will be monitored for incoming profile Zaps"
          className="cursor-pointer"
        >
          💡
        </a>
        <Tooltip id="my-tooltip2" style={{ maxWidth: "200px" }} />
        <input
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <Modal
        open={open2}
        onClose={onCloseModal2}
        center
        classNames={{
          modal: "w-[80%] bg-gray-900 text-white p-5",
          closeButton: "fill-white",
        }}
      >
        <About />
      </Modal>
    </div>
  );
};

export default Header;
