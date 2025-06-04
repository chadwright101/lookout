import { MobileFooter } from "./mobile/mobile-footer";
import { DesktopFooter } from "./desktop/desktop-footer";

export function Footer() {
  return (
    <footer className="bg-white mt-10 desktop:mt-15 desktop:px-[52px] border-t border-black">
      <div className="max-w-[1280px] mx-auto">
        <MobileFooter />
        <DesktopFooter />
      </div>
    </footer>
  );
}
