"use client";

import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

interface QrCodeProps {
  address: string;
}

export const QrCode = ({ address }: QrCodeProps) => {
  return (
    <div className="w-full p-6 rounded-2xl bg-white/60 shadow-md">
      <QRCodeSVG
        value={address}
        level="H"
        bgColor="transparent"
        className="w-full h-auto bg-transparent"
      />
    </div>
  );
};
