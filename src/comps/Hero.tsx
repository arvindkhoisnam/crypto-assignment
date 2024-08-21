import Button from "./Button";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import Wallet from "./Wallet";

export interface WalletType {
  id: number;
  publicKey: string;
}
function Hero() {
  const [pneumonic, setPneumonic] = useState<string[]>();
  const [copyState, setCopyState] = useState(false);
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [id, setId] = useState(1);
  const [maxWallet, setMaxWallet] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    if (copyState) {
      const interval = setTimeout(() => {
        setCopyState(false);
      }, 3000);
      return () => clearTimeout(interval);
    }
  }, [copyState]);

  function generate() {
    const mnemonic = generateMnemonic();
    setPneumonic(() => mnemonic.split(" "));
  }

  function createWallet() {
    if (id > 5) {
      setMaxWallet("You can have 5 wallets at max.");
      return;
    }
    const mnemonic = pneumonic?.join(" ");
    const seed = mnemonicToSeedSync(mnemonic!);

    const sol = `m/44'/501'/${id}'/0'`;
    const derivedSeed = derivePath(sol, seed.toString("hex")).key;
    const solSecret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const newWallet: WalletType = {
      id,
      publicKey: Keypair.fromSecretKey(solSecret).publicKey.toBase58(),
    };
    console.log(newWallet);
    setWallets((wallet) => [...wallet, newWallet]);
    setId((id) => id + 1);
  }

  return (
    <div className="h-screen bg-neutral-950" id="parent">
      <div className="bg-neutral-950 font-orbitron max-w-7xl mx-auto pt-10 md:pt-14">
        <div className="p-5">
          <h1 className="text-slate-100 text-sm md:text-5xl w-full text-center">
            Welcome to the future of crypto wallets.
          </h1>
        </div>
        <div className="w-full text-center md:flex gap-5 justify-center items-center font-light px-3">
          <h2 className="text-slate-100 text-xs mb-5 md:mb-0 md:text-2xl">
            Get started by generating a Mnemonic Phrase{" "}
          </h2>
          <button
            onClick={() => generate()}
            className="group before:block before:absolute before:-inset-1 before:-skew-x-[20deg] relative inline-block md:py-1 md:px-2 before:rounded-sm before:bg-lime-500 before:hover:bg-lime-300"
          >
            <span className="relative group-hover:text-black text-xs md:text-xl">
              Generate
            </span>
          </button>
        </div>
        <section className="md:grid grid-cols-2 md:gap-32 max-w-1/2 mb-10 mt-10">
          <div className="p-10">
            {pneumonic && (
              <div>
                <h2 className="text-white text-center text-sm md:text-2xl">
                  Secret Recovery Phrase
                </h2>
                <ul className="relative h-80 p-6 grid grid-cols-4 gap-2 blur-sm hover:blur-none transition ease-in-out delay-75 mt-10">
                  {pneumonic?.map((el, ind) => (
                    <li
                      key={ind}
                      className="bg-slate-50 text-xs md:text-sm text-black flex justify-center items-center rounded-md"
                    >
                      {el}
                    </li>
                  ))}
                </ul>
                <p className="text-yellow-600 mt-5 text-xs md:text-base">
                  This phrase is the ONLY way to recover your wallet. Do NOT
                  share it with anyone!
                </p>
              </div>
            )}
            {pneumonic &&
              (copyState ? (
                <button className="group before:block before:absolute before:-inset-1 before:-skew-x-[20deg] before:bg-lime-200 relative inline-block md:py-1 md:px-2 before:rounded-lg cursor-not-allowed mt-5">
                  <span className="relative text-black flex items-center gap-2 text-xs md:text-xl">
                    {" "}
                    Mnemonic Phrase Copied
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(pneumonic.join(" "));
                    setCopyState(true);
                  }}
                  className="group before:block before:absolute before:-inset-1 before:-skew-x-[20deg] before:bg-lime-500 relative inline-block md:py-1 md:px-2 before:rounded-sm before:hover:bg-lime-400 mt-5"
                >
                  <span className="relative text-white group-hover:text-black flex items-center gap-2 text-xs md:text-xl">
                    <FaRegCopy /> Mnemonic Phrase
                  </span>
                </button>
              ))}
            {pneumonic && (
              <div className="mt-5 flex items-center">
                <input
                  type="checkbox"
                  onChange={() => setCheckbox(true)}
                  disabled={checkbox}
                />
                <label
                  className={`pl-4 ${
                    checkbox ? "text-gray-500" : "text-white"
                  } text-xs md:text-sm`}
                >
                  I have saved my Mnemonic Phrase.
                </label>
              </div>
            )}
          </div>
          <div className="p-10">
            {pneumonic && (
              <div>
                <div className="text-center">
                  {checkbox && (
                    <Button onClick={() => createWallet()}>
                      Create Wallet
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-10 w-full flex flex-col items-center gap-4">
              {wallets.map((wallet) => (
                <div key={wallet.id}>
                  <Wallet wallet={wallet} />
                </div>
              ))}
            </div>
            <div className="mt-10">
              {maxWallet ? (
                <p className="text-gray-500 mt-4 text-xs md:text-base w-full text-center">
                  {maxWallet}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Hero;
