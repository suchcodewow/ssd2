import Headernav from "@/context/headernav";
import { ModeToggle } from "@/context/mode-toggle.";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-5 py-5 mx-0 border-b dark:border-b-0 dark:bg-slate-800">
      <Image src="/wow.png" width={32} height={32} className="flex-none" />
      <Headernav />
      <ModeToggle />
    </div>
  );
}
