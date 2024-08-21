import { FaRegCopy } from "react-icons/fa";
import { WalletType } from "./Hero";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import { useState } from "react";

function Wallet({ wallet }: { wallet: WalletType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-20"
            id="overlay"
            onClick={(e) => {
              console.log(e.target);
              if (e.target !== document.getElementById("overlay")) {
                setIsModalOpen(true);
                return;
              } else {
                setIsModalOpen(false);
                return;
              }
            }}
          >
            <Modal
              wallet={wallet}
              setIsModalOpen={() => setIsModalOpen(false)}
            />
          </div>,
          document.getElementById("parent")!
        )}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className="w-full before:block before:absolute before:-inset-1 before:-skew-x-[20deg] before:bg-slate-300 relative inline-flex justify-between md:py-1 md:px-2 before:rounded-sm mt-5 cursor-pointer hover:scale-105 transition-all ease-in-out delay-100 before:hover:shadow-md before:hover:shadow-lime-500"
      >
        <div className="relative flex gap-6 md:gap-10">
          <img
            src="https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fsolana-labs%2Ftoken-list%40main%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&fit=cover&width=40&height=30"
            className="relative rounded-full z-10"
          />

          <div className="flex items-center gap-10 md:gap-32">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-black flex items-center">
                Solana
              </span>
              <div className="relative flex flex-col justify-start text-2xl cursor-pointer">
                <span
                  className="text-xs flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.target);
                    navigator.clipboard.writeText(wallet.publicKey);
                  }}
                >
                  <FaRegCopy /> {wallet.publicKey.slice(0, 6)}...
                  {wallet.publicKey.slice(38)}
                </span>
              </div>
            </div>
            <span className="text-xs">$0.00</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
