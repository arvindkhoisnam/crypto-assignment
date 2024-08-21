import axios from "axios";
import { useEffect, useState } from "react";
import { WalletType } from "./Hero";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { IoIosSwap } from "react-icons/io";
import { BsCurrencyDollar } from "react-icons/bs";

const URL = import.meta.env.VITE_API_ALCHEMY_SOLANA;

function Modal({
  wallet,
  setIsModalOpen,
}: {
  wallet: WalletType;
  setIsModalOpen: () => void;
}) {
  const [valInDollars, setValInDollars] = useState<number>();
  const [value, setVlaue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWalletDetails() {
      setLoading(true);
      const res = await axios.post(URL, {
        jsonrpc: "2.0",
        id: wallet.id,
        method: "getBalance",
        params: [wallet.publicKey],
      });

      const valueUpto = Number(res.data.result.value) / 1000000000;
      const decimalPos = valueUpto.toString().indexOf(".");
      const finalValue = valueUpto.toString().substring(0, decimalPos + 3);
      const valueInDollars = Number(finalValue) * 141;
      setValInDollars(valueInDollars);
      setVlaue(finalValue);
      setLoading(false);
    }
    getWalletDetails();
  }, [wallet.id, wallet.publicKey]);

  return (
    <div
      onClick={setIsModalOpen}
      id="modal"
      className="bg-black md:w-1/3 absolute left-1/2 top-1/2 md:left-1/2 md:top-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-30 p-12 text-sm rounded-sm shadow-lg shadow-lime-300 transition-all ease-in-out delay-300"
    >
      <div>
        <div className="flex justify-center">
          <img
            src="https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fsolana-labs%2Ftoken-list%40main%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&fit=cover&width=70&height=70"
            className="relative rounded-full z-10"
          />
        </div>
        <div className="p-2 text-xs text-white mb-4">
          Public key : {wallet.publicKey.slice(0, 10)}.....
          {wallet.publicKey.slice(38)}
        </div>
        <div className="p-2 text-xs text-white  mb-4">
          SOL: {loading ? "loading..." : `${value}`}
        </div>
        <div className="p-2 text-xs text-white mb-6">
          USD: {loading ? "loading..." : `$${valInDollars}`}
        </div>
        <div className="p-4 flex justify-evenly pb-2">
          <button className="bg-black size-16 text-white flex flex-col items-center justify-center gap-3 text-2xl shadow shadow-lime-500 hover:scale-105">
            <FaPlus />
            <span className="text-sm">Receive</span>
          </button>
          <button className="bg-black size-16 text-white flex flex-col items-center justify-center gap-3 text-2xl shadow shadow-lime-500 hover:scale-105">
            <IoIosSend />
            <span className="text-sm">Send</span>
          </button>
          <button className="bg-black size-16 text-white flex flex-col items-center justify-center gap-3 text-2xl shadow shadow-lime-500 hover:scale-105">
            <IoIosSwap />
            <span className="text-sm">Swap</span>
          </button>
          <button className="bg-black size-16 text-white flex flex-col items-center justify-center gap-3 text-2xl shadow shadow-lime-500 hover:scale-105">
            <BsCurrencyDollar />
            <span className="text-sm">Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
