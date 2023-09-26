"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ navItem }) {
  // console.log(navItem);
  const currentPath = usePathname();
  const cleanSlug = navItem.url.endsWith("/") ? navItem.url.slice(0, -1) : navItem.url;
  // console.log("segment:", currentPath, "slug:", cleanSlug);
  const isActive = cleanSlug === currentPath;

  return (
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
