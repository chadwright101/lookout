import Link from "next/link";
import Image from "next/image";

import navData from "@/_data/nav-data.json";
import LogoComponent from "@/_lib/logo/logo-component";

export function DesktopFooter() {
  return (
    <div className="hidden desktop:block bg-white pt-7 pb-5">
      <div className="flex justify-between px-[52px]">
        <nav>
          <h4 className="mb-2">Navigation</h4>
          <ul className="flex flex-col">
            {navData.map((item) => {
              return (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className=" text-[14px] font-light hover:text-opacity-80 ease-in-out duration-200 desktop:hover:text-green"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 items-end justify-around">
          <LogoComponent smallVersion rightText heading4 />
          <div className="text-right">
            <p className="text-[14px]">Designed & developed by</p>
            <Link
              href="https://thewrightdesigns.co.za"
              aria-label="The Wright Designs"
              className="text-[14px] font-light text-link-blue hover:text-black ease-in-out duration-200"
              target="_blank"
            >
              The Wright Designs
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center col-span-2 place-self-center w-full mt-6">
        <h4
          className="font-light pt-5 text-[14px]"
          style={{ fontVariant: "normal" }}
        >
          © Swift Tool Hire |
          <Link
            href="/"
            className="text-[14px] font-light"
            style={{ fontVariant: "normal" }}
          >
            www.swifttoolhire.co.za
          </Link>
        </h4>
      </div>
    </div>
  );
}
