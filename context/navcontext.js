"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function NavLink({ slug, children }) {
  const useSegment = useSelectedLayoutSegments();

  const segment = useSegment ? `/${useSegment.join("/")}` : "";
  console.log("segment:", segment, " slug: ", slug);
  const isActive = slug === segment;

  return (
    <Link
      href={slug}
      // Change style depending on whether the link is active
      className={isActive ? "font-bold" : "text-gray-500"}
    >
      {children}
    </Link>
  );
}
