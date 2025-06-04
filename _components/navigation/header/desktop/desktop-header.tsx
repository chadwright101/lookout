import Link from "next/link";

import navData from "@/_data/nav-data.json";
import LogoComponent from "@/_lib/logo/logo-component";

export function DesktopHeader() {
  return (
    <div className="hidden pt-5 pb-4 px-15 desktop:flex items-center justify-between overflow-hidden">
      <Link href="/" className="mr-auto hover:opacity-80">
        <LogoComponent />
      </Link>
      <nav className="self-end">
        <ul className="flex gap-4 items-center">
          {navData.map(({ title, url }, id) => {
            return (
              <li key={id}>
                <Link href={url} className="text-paragraph hover:text-green">
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
