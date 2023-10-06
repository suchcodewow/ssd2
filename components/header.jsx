import Headernav from "@/context/headernav";
import { ModeToggle } from "@/context/mode-toggle.";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="top-0 sticky bg-white flex-none h-20 w-full px-5 flex justify-between items-center  border-b dark:border-b-0 dark:bg-slate-800 ">
        <div className="flex items-center ">
          <Image alt="SuchCodeWow" src="/wow.png" width={32} height={32} className="flex-none" />
          <span className="text-lg font-bold px-3">SuchCodeWow</span>
        </div>
        <Headernav />
        <ModeToggle />
      </div>
    </>
  );
}
