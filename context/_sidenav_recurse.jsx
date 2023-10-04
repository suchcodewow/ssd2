"use client";
import { Disclosure } from "@headlessui/react";
import { useContext } from "react";
import { ClientContext } from "./clientcontext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allContents } from "@/.contentlayer/generated";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const docs = allContents.sort((a, b) => a.order - b.order);

export const RenderNav = ({ nodeStart }) => {
  const contentBase = nodeStart ? nodeStart : usePathname();
  // const { baseUrl, generateNav } = useContext(ClientContext);
  // if (generateNav) {
  //   console.log("generate: ", currentURL);
  // }
  return (
    <div className="mx-auto w-full max-w-md  bg-white dark:bg-slate-800 ml-2">
      {docs
        .filter((a) => a.section == contentBase)
        .map((navItem) => {
          if (navItem.parentOf) {
            return [
              <Disclosure key={navItem.url}>
                {({ open }) => [
                  <>
                    <Disclosure.Button className="flex w-full justify-start bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      {navItem.title}
                      <ChevronRightIcon className={`${open ? "rotate-90 transform" : ""} h-5 w-5 text-purple-500`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <RenderNav nodeStart={navItem.parentOf} />
                    </Disclosure.Panel>
                  </>,
                ]}
              </Disclosure>,
            ];
          } else {
            return [
              // <Disclosure>
              //   <Disclosure.Button>{navItem.title}</Disclosure.Button>,<Disclosure.Panel>I dunno</Disclosure.Panel>
              // </Disclosure>,
              <Link key={navItem.url} href={navItem.url}>
                {navItem.title}
              </Link>,
              <br />,
            ];
          }
          //   return [<NavLink navItem={navItem} />, navItem.parentOf && <RenderNav nodeStart={navItem.parentOf} />];
        })}
    </div>
  );
};
