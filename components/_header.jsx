import Example from "../context/headernav";
import { ModeToggle } from "../context/mode-toggle";
import Link from "next/link";

export default async function () {
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <nav className="ml-auto text-sm font-medium space-x-6">
          <Example />
          <Link className="font-bold" href="/">
            Home
          </Link>
          <Link href="/article">article</Link>
          <Link href="/guide">guide</Link>
        </nav>
      </div>
    </header>
  );
}
