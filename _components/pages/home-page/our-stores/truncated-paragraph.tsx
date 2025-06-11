"use client";

import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TruncatedParagraphProps {
  paragraphs: string[];
  storeName?: string;
  lines?: number;
  showPopUp?: boolean;
  setShowPopUp?: (show: boolean) => void;
}

export const TruncatedParagraph = ({
  paragraphs,
  lines: initialLines = 4,
  showPopUp = false,
  storeName,
  setShowPopUp = () => {},
}: TruncatedParagraphProps) => {
  const [maxChars, setMaxChars] = useState(150);
  const [lines, setLines] = useState(initialLines);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setLines(window.innerWidth >= 1280 ? 5 : 4);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target;
      const lineHeight =
        parseFloat(getComputedStyle(container).lineHeight) || 24;
      const containerWidth = container.clientWidth;

      const charsPerLine = Math.floor(containerWidth / 8);
      const newMaxChars = Math.floor(charsPerLine * (lines - 0.5));

      setMaxChars(newMaxChars);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lines]);

  const fullText = paragraphs.join(" ");

  return (
    <div ref={containerRef}>
      <p>
        {fullText.substring(0, maxChars)}...{" "}
        <button
          onClick={() => setShowPopUp(true)}
          className="text-link-blue p-2 -m-2 underline italic desktop:cursor-pointer desktop:p-0 desktop:m-0 desktop:no-underline desktop:hover:underline"
        >
          See more
        </button>
      </p>

      {showPopUp && (
        <div className="fixed ease-in-out inset-0 p-5 bg-white/90 flex items-center justify-center z-50 desktop:p-0">
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
