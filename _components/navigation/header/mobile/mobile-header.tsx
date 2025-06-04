"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { X, AlignJustify } from "lucide-react";
import classNames from "classnames";

import LogoComponent from "@/_lib/logo/logo-component";

import navData from "@/_data/nav-data.json";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="relative px-7 py-4.5 desktop:hidden">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="flex gap-1 items-center">
          <LogoComponent smallVersion />
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="-m-3 p-3"
          aria-label="Open menu"
        >
          <AlignJustify
            color="#231f20"
            className="h-12 w-12 p-2"
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Slide-out Menu */}
      <div
        className={classNames(
          "fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex py-5 items-center justify-end px-7">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="-mt-1"
          >
            <X color="#231f20" className="h-12 w-12 p-2" strokeWidth={2} />
          </button>
        </div>
        <nav className="px-7">
          <ul className="grid gap-5">
            {navData.map(({ title, url }, id) => {
              return (
                <li key={id}>
                  <Link
                    href={url}
                    onClick={() => setIsOpen(false)}
                    className="text-[20px] text-black font-normal p-3 -m-3"
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
