"use client";
import { Disclosure, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { allContents } from "@/.contentlayer/generated";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const docs = allContents.sort((a, b) => a.order - b.order);

// export const RenderNav = ({ nodeStart }) => {
//   return (
//     <div className="ml-3">
//       {docs
//         .filter((a) => a.section == nodeStart)
//         .map((navItem) => {
//           return [<NavLink navItem={navItem} />, navItem.parentOf && <RenderNav nodeStart={navItem.parentOf} />];
//         })}
//     </div>
//   );
// };

export const RenderNav = ({ nodeStart }) => {
  return (
    <div className="mx-auto w-full max-w-md  bg-white dark:bg-slate-800 ml-2">
      {docs
        .filter((a) => a.section == nodeStart)
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
              <Link href={navItem.url}>{navItem.title}</Link>,
              <br />,
            ];
          }
          //   return [<NavLink navItem={navItem} />, navItem.parentOf && <RenderNav nodeStart={navItem.parentOf} />];
        })}
    </div>
  );
};

export default function NavLink({ navItem }) {
  // console.log(navItem);
  const currentPath = usePathname();
  const cleanSlug = navItem.url.endsWith("/") ? navItem.url.slice(0, -1) : navItem.url;
  // console.log("segment:", currentPath, "slug:", cleanSlug.substring(0, currentPath.length));
  const isActive = cleanSlug === currentPath;
  //   const isOnPath = cleanSlug.substring(0, currentPath.length) === currentPath;
  //   console.log(cleanSlug, "isOnPath:", isOnPath);

  return (
    // <div key={navItem.url} className={isOnPath ? "bg-slate-300" : ""}>
    <div key={navItem.url}>
      <Link
        href={navItem.url}
        // Change style depending on whether the link is active
        className={isActive ? "font-bold" : ""}
      >
        {navItem.title}
      </Link>
    </div>
  );
}

// export function SideNav({ navItem }) {
//     const currentPath = usePathname();
//     const cleanSlug = navItem.url.endsWith("/") ? navItem.url.slice(0, -1) : navItem.url;
//   console.log("segment:", currentPath, "slug:", cleanSlug.substring(0, currentPath.length));
//     const isActive = cleanSlug === currentPath;
//   return (
//     <div>
//       <Disclosure>
//         <Disclosure.Button className="py-2">
//           <Link href="/content">Is your mom available?</Link> click
//         </Disclosure.Button>
//           <Disclosure.Panel className="text-gray-500">
//             Yes! You can purchase a license that you can share with your entire team.
//             <Disclosure>
//               <Disclosure.Button className="py-2">Is your mom available?</Disclosure.Button>
//               <Disclosure.Panel className="text-gray-500">
//                 Yes! You can purchase a license that you can share with your entire team.
//               </Disclosure.Panel>
//             </Disclosure>
//           </Disclosure.Panel>
//         </Transition>
//       </Disclosure>
//     </div>
//   );
// }
