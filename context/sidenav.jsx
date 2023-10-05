"use client";
import { Disclosure } from "@headlessui/react";
import { useContext } from "react";
import { ClientContext } from "./clientcontext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allContents } from "@/.contentlayer/generated";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

// const docs = allContents.sort((a, b) => a.order - b.order);

export const RenderNav = ({ structure }) => {
  // console.log(structure.map((a) => a.url));
  const currentUri = usePathname();
  const uriStructureData = structure.find((a) => a.url === currentUri);
  const normalizedSection = uriStructureData.parentOf ? uriStructureData.parentOf : uriStructureData.section;
  const sideNavIndex = structure.find((a) => a.parentOf === normalizedSection);
  const sideBackTo = sideNavIndex ? structure.find((a) => a.parentOf === sideNavIndex.section) : null;
  const sideNavData = structure.filter((a) => a.section === normalizedSection);
  // console.log("index", sideNavIndex);
  // console.log("backto", sideBackTo);
  // const navBase = uriStructureData.parentOf ? uriStructureData.parentOf : uriStructureData.section;
  return (
    <div className="w-56 flex-none">
      {sideBackTo && (
        <div>
          backto: <Link href={sideBackTo.url}>{sideBackTo.title}</Link>
        </div>
      )}
      <div>
        CURRENT INDEX: <Link href={sideNavIndex.url}>{sideNavIndex.title}</Link>
      </div>
      {sideNavData.map((navItem) => (
        <div key={navItem.url} className="flex">
          <Link href={navItem.url}>{navItem.title}</Link>
          {navItem.parentOf && <ChevronRightIcon className="h-6" />}
        </div>
      ))}
    </div>
  );
};
