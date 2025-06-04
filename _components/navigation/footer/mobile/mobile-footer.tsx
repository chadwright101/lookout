import LogoComponent from "@/_lib/logo/logo-component";
import Image from "next/image";
import Link from "next/link";

export function MobileFooter() {
  return (
    <div className="flex flex-col gap-5 items-center px-7 py-10 desktop:hidden">
      <LogoComponent smallVersion centerText heading4 />
      <div className="text-center">
        <p className="text-[14px]">Designed & developed by</p>
        <Link
          href="https://thewrightdesigns.co.za"
          aria-label="The Wright Designs"
          className="text-[14px] text-link-blue p-2 -m-2 font-light"
          target="_blank"
        >
          The Wright Designs
        </Link>
      </div>
      <hr className="text-black/25 w-1/4" />
      <div className="text-center">
        <Link
          href="/"
          className="text-[14px] p-2 -m-2 text-link-blue font-light"
        >
          www.lookoutcentre.co.za
        </Link>
        <h4 className="font-light text-[14px]">
          © The Lookout Centre {new Date().getFullYear()}
        </h4>
      </div>
    </div>
  );
}
