import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

import classNames from "classnames";

import { TruncatedParagraph } from "./truncated-paragraph";

export interface StoreProps {
  store: {
    name: string;
    paragraphs?: string[];
    contact: {
      phone?: string;
      email?: string;
      website?: string;
      instagram?: string;
      facebook?: string;
    }[];
    image: string;
  };
}

interface SingleStoreComponentProps {
  isOutsideSlide?: boolean;
  isDisabled?: boolean;
  store: StoreProps["store"];
  showPopUp?: boolean;
  setShowPopUp?: (show: boolean) => void;
  onDisabledClick?: () => void;
  onContactInteraction?: (isInteracting: boolean) => void;
}

const SingleStoreComponent = ({
  store,
  isOutsideSlide,
  isDisabled = false,
  showPopUp = false,
  setShowPopUp = () => {},
  onDisabledClick = () => {},
  onContactInteraction = () => {},
}: SingleStoreComponentProps) => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);

  // Helper function to clean phone number (remove leading 0)
  const cleanPhoneNumber = (phone: string) => {
    return phone.replace(/^0/, "");
  };

  // Helper function to format phone number with spaces
  const formatPhoneNumber = (phone: string) => {
    const cleanNumber = phone.replace(/^0/, ""); // Remove leading 0

    if (cleanNumber.length === 9) {
      // Mobile numbers: +27 XX XXX XXXX
      return `+27 ${cleanNumber.slice(0, 2)} ${cleanNumber.slice(
        2,
        5
      )} ${cleanNumber.slice(5)}`;
    } else if (cleanNumber.length === 8) {
      // Landline numbers: +27 XX XXX XXX
      return `+27 ${cleanNumber.slice(0, 2)} ${cleanNumber.slice(
        2,
        5
      )} ${cleanNumber.slice(5)}`;
    } else if (cleanNumber.length === 7) {
      // Short landline numbers: +27 XX XXX XX
      return `+27 ${cleanNumber.slice(0, 2)} ${cleanNumber.slice(
        2,
        5
      )} ${cleanNumber.slice(5)}`;
    }

    // Fallback for other lengths
    return `+27 ${cleanNumber}`;
  };
  return (
    <article
      className={classNames(
        "space-y-5 bg-white desktop:drop-shadow-black/20 desktop:drop-shadow-[5px_5px_10px] desktop:rounded-[6px] desktop:border-4 desktop:p-5 ease-in-out duration-300",
        {
          "desktop:scale-95 desktop:border-beige": isOutsideSlide,
          "desktop:border-green": !isOutsideSlide,
          "desktop:opacity-50 desktop:cursor-pointer": isDisabled,
        }
      )}
      onClick={isDisabled ? onDisabledClick : undefined}
    >
      <h4 className="desktop:border-b-4 border-green">{store.name}</h4>
      {store.paragraphs && store.paragraphs.length > 0 && (
        <TruncatedParagraph
          paragraphs={store.paragraphs}
          setShowPopUp={setShowPopUp}
          showPopUp={showPopUp}
          storeName={store.name}
        />
      )}
      <ul className="flex items-center justify-center gap-5 mt-7 min-h-7 desktop:justify-start desktop:min-h-6 desktop:mt-5">
        {showPhoneNumber ? (
          <li className="flex items-center justify-between w-full">
            {store.contact.find((contact) => contact.phone)?.phone && (
              <Link
                href={`tel:+27${cleanPhoneNumber(
                  store.contact.find((contact) => contact.phone)?.phone || ""
                )}`}
                className="text-paragraph text-link-blue hover:text-black ease-in-out duration-300"
              >
                {formatPhoneNumber(
                  store.contact.find((contact) => contact.phone)?.phone || ""
                )}
              </Link>
            )}
            <button
              onClick={() => {
                setShowPhoneNumber(false);
                onContactInteraction(false);
              }}
              className="cursor-pointer"
              aria-label="Close phone number"
            >
              <X size={20} color="#719A94" />
            </button>
          </li>
        ) : showEmailAddress ? (
          <li className="relative w-full">
            <div className="flex items-center w-full pr-8">
              {store.contact.find((contact) => contact.email)?.email && (
                <Link
                  href={`mailto:${
                    store.contact.find((contact) => contact.email)?.email
                  }`}
                  className="text-[14px] text-link-blue hover:text-black ease-in-out duration-300 break-all"
                >
                  {store.contact.find((contact) => contact.email)?.email}
                </Link>
              )}
            </div>
            <button
              onClick={() => {
                setShowEmailAddress(false);
                onContactInteraction(false);
              }}
              className="absolute top-0 right-0 cursor-pointer"
              aria-label="Close email address"
            >
              <X size={20} color="#719A94" />
            </button>
          </li>
        ) : (
          store.contact.map((contact, index) => {
            const href = contact.phone
              ? `tel:+27${cleanPhoneNumber(contact.phone)}`
              : contact.email
              ? `mailto:${contact.email}`
              : contact.website
              ? contact.website
              : contact.instagram
              ? `https://instagram.com/${contact.instagram}`
              : contact.facebook
              ? contact.facebook
              : null;

            const iconSrc = contact.phone
              ? "/icons/phone.svg"
              : contact.email
              ? "/icons/email.svg"
              : contact.website
              ? "/icons/website.svg"
              : contact.instagram
              ? "/icons/instagram.svg"
              : contact.facebook
              ? "/icons/facebook.svg"
              : null;

            if (!href || !iconSrc) return null;

            if (contact.phone) {
              return (
                <li key={index}>
                  {/* Mobile: normal phone link */}
                  <Link href={href} className="desktop:hidden">
                    <Image
                      src={iconSrc}
                      alt={store.name}
                      width={28}
                      height={28}
                    />
                  </Link>
                  {/* Desktop: clickable to show number */}
                  <button
                    onClick={() => {
                      setShowPhoneNumber(true);
                      onContactInteraction(true);
                    }}
                    className="hidden desktop:block hover:opacity-80 ease-in-out duration-300 cursor-pointer"
                    aria-label="Show phone number"
                  >
                    <Image
                      src={iconSrc}
                      alt={store.name}
                      width={28}
                      height={28}
                      className="desktop:h-6 desktop:w-auto"
                    />
                  </button>
                </li>
              );
            }

            // Special handling for email icon on desktop
            if (contact.email) {
              return (
                <li key={index}>
                  {/* Mobile: normal email link */}
                  <Link href={href} className="desktop:hidden">
                    <Image
                      src={iconSrc}
                      alt={store.name}
                      width={28}
                      height={28}
                    />
                  </Link>
                  {/* Desktop: clickable to show email */}
                  <button
                    onClick={() => {
                      setShowEmailAddress(true);
                      onContactInteraction(true);
                    }}
                    className="hidden desktop:block hover:opacity-80 ease-in-out duration-300 cursor-pointer"
                    aria-label="Show email address"
                  >
                    <Image
                      src={iconSrc}
                      alt={store.name}
                      width={28}
                      height={28}
                      className="desktop:h-6 desktop:w-auto"
                    />
                  </button>
                </li>
              );
            }

            // Determine target based on contact type (website, instagram, facebook)
            const target = "_blank";
            const rel = "noopener noreferrer";

            // Normal behavior for other icons
            return (
              <li key={index}>
                <Link href={href} target={target} rel={rel}>
                  <Image
                    src={iconSrc}
                    alt={store.name}
                    width={28}
                    height={28}
                    className="desktop:h-6 desktop:w-auto desktop:hover:opacity-80 ease-in-out duration-300"
                  />
                </Link>
              </li>
            );
          })
        )}
      </ul>
      <Image
        src={store.image}
        alt={store.name}
        width={800}
        height={600}
        className="mt-5 w-full h-auto object-cover aspect-[4.5/3] desktop:aspect-[4/3]"
      />
    </article>
  );
};

export default SingleStoreComponent;
