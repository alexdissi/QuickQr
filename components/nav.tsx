import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./darkMode";

export function Nav() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 flex-row">
      <div>
        <h1 className="text-2xl font-bold">Quick QR</h1>
      </div>
      <div className="flex items-center flex-row gap-7">
        <ModeToggle />
        <h2>
          Made with 🩵 by{" "}
          <Link
            href={"https://www.linkedin.com/in/alexandre-dissi94460"}
            className="underline"
          >
            Alexandre Dissi
          </Link>
        </h2>
      </div>
    </nav>
  );
}
