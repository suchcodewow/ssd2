import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export default async function () {
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <nav className="ml-auto text-sm font-medium space-x-6">
          <Link className="font-bold" href="/">
            Home
          </Link>
          <Link href="/content">Content</Link>
        </nav>
      </div>
    </header>
  );
}
