import Image from "next/image";
import Link from "next/link";

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
}

const SingleStoreComponent = ({
  store,
  isOutsideSlide,
  isDisabled = false,
  showPopUp = false,
  setShowPopUp = () => {},
  onDisabledClick = () => {},
}: SingleStoreComponentProps) => {
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
        {store.contact.map((contact, index) => {
          const href = contact.phone
            ? `tel:${contact.phone}`
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

          return (
            <li key={index}>
              <Link href={href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={iconSrc}
                  alt={store.name}
                  width={28}
                  height={28}
                  className="desktop:h-6 desktop:w-auto"
                />
              </Link>
            </li>
          );
        })}
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
