"use client";

import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";

import { fetchEmailAddress } from "@/_actions/contact-actions";

export interface showContactProps {
  buttonClasses?: string;
  linkClasses?: string;
}

const ShowEmailAddress = ({ buttonClasses, linkClasses }: showContactProps) => {
  const [showEmail, setShowEmail] = useState("Show email address");
  const [showSpinnerEmail, setShowSpinnerEmail] = useState(false);

  const handleShowEmailAddress = async () => {
    setShowSpinnerEmail(true);
    const emailAddress = (await fetchEmailAddress()) || "Email not found";
    setShowEmail(emailAddress);
    setShowSpinnerEmail(false);
  };

  if (showEmail === "Show email address") {
    return (
      <button
        onClick={() => handleShowEmailAddress()}
        className={classNames(
          "px-2 text-left -mx-2 py-3 -my-3 text-paragraph hover:desktop:opacity-80 hover:cursor-pointer desktop:p-0 desktop:m-0 italic",
          buttonClasses
        )}
        aria-label="Show email address"
      >
        {showSpinnerEmail ? <div className="spinner-contact"></div> : showEmail}
      </button>
    );
  } else {
    return (
      <Link
        href={`mailto:${showEmail}`}
        className={classNames(
          "py-3 text-left px-2 -my-3 text-paragraph text-linkBlue -mx-2 desktop:hover:opacity-80 desktop:p-0 desktop:m-0",
          linkClasses
        )}
      >
        {showEmail}
      </Link>
    );
  }
};

export default ShowEmailAddress;
