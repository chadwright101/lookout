"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface TruncatedParagraphProps {
  paragraphs?: string[];
  storeName?: string;
  lines?: number;
  showPopUp?: boolean;
  setShowPopUp?: (show: boolean) => void;
}

export const TruncatedParagraph = ({
  paragraphs,
  lines = 4,
  showPopUp = false,
  storeName,
  setShowPopUp = () => {},
}: TruncatedParagraphProps) => {
  if (!paragraphs || paragraphs.length === 0) {
    return null;
  }

  const fullText = paragraphs.join(" ");

  return (
    <div>
      <p
        className={`overflow-hidden ${
          lines === 3
            ? "line-clamp-3"
            : lines === 4
            ? "line-clamp-4"
            : lines === 5
            ? "line-clamp-5"
            : "line-clamp-4"
        }`}
      >
        {fullText}
      </p>
      <button
        onClick={() => setShowPopUp(true)}
        className="text-link-blue p-2 -m-2 underline italic desktop:cursor-pointer desktop:p-0 desktop:m-0 desktop:no-underline desktop:hover:underline"
      >
        See more
      </button>

      {/* Desktop popup - contained within component */}
      {showPopUp && (
        <div className="hidden desktop:flex fixed ease-in-out inset-0 p-5 bg-white/90 items-center justify-center z-50 desktop:p-0">
          <div className="bg-white grid grid-rows-[auto_1fr] border-4 border-green rounded-[6px] relative p-6 max-w-lg desktop:border-none">
            <button
              className="cursor-pointer place-self-end bg-white/75 p-2 -m-2 desktop:p-1 desktop:-m-1 desktop:fixed desktop:top-5 desktop:right-5 desktop:hover:opacity-75 ease-in-out duration-300"
              onClick={() => setShowPopUp(false)}
            >
              <X color="#0F172A" />
            </button>
            <div className="space-y-4 pr-4 overflow-y-scroll max-h-[320px] tablet:max-h-[280px] desktop:max-h-[335px]">
              <h4>{storeName}</h4>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Popup component to be rendered at a higher level
export const StorePopup = ({
  showPopUp,
  setShowPopUp,
  storeName,
  paragraphs,
}: {
  showPopUp: boolean;
  setShowPopUp: (show: boolean) => void;
  storeName?: string;
  paragraphs?: string[];
}) => {
  useEffect(() => {
    // Only prevent scroll on mobile devices (below 1280px)
    const handleScrollPrevention = () => {
      if (window.innerWidth < 1280) {
        if (showPopUp) {
          // Prevent body scroll when popup is open on mobile
          document.body.style.overflow = "hidden";
        } else {
          // Restore body scroll when popup is closed on mobile
          document.body.style.overflow = "unset";
        }
      }
    };

    handleScrollPrevention();

    // Listen for resize events to handle screen size changes
    window.addEventListener("resize", handleScrollPrevention);

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", handleScrollPrevention);
    };
  }, [showPopUp]);

  if (!showPopUp || !paragraphs || paragraphs.length === 0) {
    return null;
  }

  return (
    <div
      className="desktop:hidden fixed ease-in-out inset-0 p-5 bg-white/90 flex items-center justify-center z-[9999]"
      onClick={() => setShowPopUp(false)}
    >
      <div
        className="bg-white grid grid-rows-[auto_1fr] border-4 border-green rounded-[6px] relative p-6 max-w-lg desktop:border-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer place-self-end bg-white/75 p-2 -m-2 desktop:p-1 desktop:-m-1 desktop:fixed desktop:top-5 desktop:right-5 desktop:hover:opacity-75 ease-in-out duration-300"
          onClick={() => setShowPopUp(false)}
        >
          <X color="#0F172A" />
        </button>
        <div className="space-y-4 pr-4 overflow-y-scroll max-h-[320px] tablet:max-h-[280px] desktop:max-h-[335px]">
          <h4>{storeName}</h4>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
