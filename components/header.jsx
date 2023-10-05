import Headernav from "@/context/headernav";
import { ModeToggle } from "@/context/mode-toggle.";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="flex items-center ">
        <Image src="/wow.png" width={32} height={32} className="flex-none" />
        <span className="text-lg font-bold px-3">SuchCodeWow</span>
      </div>
      <Headernav />
      <ModeToggle />
    </>
  );
}
