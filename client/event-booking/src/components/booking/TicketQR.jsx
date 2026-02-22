import QRCode from "react-qr-code";

export default function TicketQR({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-black">
      <QRCode value={JSON.stringify(data)} size={200} />

      <p className="text-center mt-4 font-semibold">
        Scan at Entry
      </p>
    </div>
  );
}