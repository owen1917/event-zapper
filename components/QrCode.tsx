import { QRCodeSVG } from "qrcode.react";
import useStore from "./store";
function QrCode({
  value,
  imageSource,
}: {
  value: string;
  imageSource: string;
}) {
  const QRCodeSize = useStore((state) => state.QRCodeSize);
  const npubPrefix = useStore((state) => state.npubPrefix);
  return (
    <div
      style={{ width: `${QRCodeSize}%` }}
      className="p-2 rounded-3xl shadow-sm aspect-square max-w-full"
    >
      <QRCodeSVG
        className="w-full h-full"
        value={npubPrefix + value}
        imageSettings={{
          src: imageSource,
          height: 50,
          width: 50,
          excavate: true,
        }}
      />
    </div>
  );
}

export default QrCode;
