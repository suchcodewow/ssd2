"use client";
import { useContext } from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import UserContext from "./usercontext";

export default function NavLink({ slug, children }) {
  const useSegment = useSelectedLayoutSegments();
  let currentUrl = useContext(UserContext);
  const segment = useSegment ? `/${useSegment.join("/")}` : "";
  // console.log("segment:", segment, " slug: ", slug);
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
