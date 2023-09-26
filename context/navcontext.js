"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ navItem }) {
  // console.log(navItem);
  const currentPath = usePathname();
  const cleanSlug = navItem.url.endsWith("/") ? navItem.url.slice(0, -1) : navItem.url;
  // console.log("segment:", currentPath, "slug:", cleanSlug.substring(0, currentPath.length));
  const isActive = cleanSlug === currentPath;
  const isOnPath = cleanSlug.substring(0, currentPath.length) === currentPath;
  console.log(cleanSlug, "isOnPath:", isOnPath);

  return (
    <div key={navItem.url} className={isOnPath ? "bg-slate-300" : ""}>
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
