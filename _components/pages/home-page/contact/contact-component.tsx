"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchEmailAddress } from "@/_actions/contact-actions";
import MapComponent from "./map-component";

const ContactComponent = () => {
  const [showEmail, setShowEmail] = useState("Show email address");
  const [showspinnerEmail, setShowspinnerEmail] = useState(false);

  const handleShowEmailAddress = async () => {
    setShowspinnerEmail(true);
    const emailAddress = await fetchEmailAddress();
    setShowEmail(emailAddress);
    setShowspinnerEmail(false);
  };

  return (
    <section className="grid gap-10 desktop:grid-cols-2">
      <div className="flex flex-col gap-10">
        <h2>Contact</h2>
        <p>For any enquiries, please reach out via email.</p>
        <ul className="space-y-10">
          <li className="grid gap-1.5 phone:gap-3 items-center phone:grid-cols-[65px_1fr] desktop:grid-cols-1">
            <h3 className="text-subheading">Email:</h3>
            {showEmail === "Show email address" ? (
              <button
                onClick={handleShowEmailAddress}
                className="text-left text-paragraph text-link-blue desktop:hover:opacity-90 desktop:hover:underline ease-in-out duration-300 desktop:hover:cursor-pointer"
                aria-label="Show email address"
              >
                {showspinnerEmail ? <div className="spinner"></div> : showEmail}
              </button>
            ) : (
              <Link
                href={`mailto:${showEmail}`}
                className="text-paragraph text-link-blue desktop:hover:opacity-90 desktop:hover:underline ease-in-out duration-300"
              >
                {showEmail}
              </Link>
            )}
          </li>
          <li className="grid gap-1.5 phone:gap-3 items-center phone:grid-cols-[65px_1fr] desktop:grid-cols-1">
            <h3 className="text-subheading">Address:</h3>
            <Link
              href="https://maps.app.goo.gl/bYhVPfqeKTjcb1ck7"
              target="_blank"
            >
              <address className="text-paragraph text-link-blue desktop:hover:opacity-90 desktop:hover:underline ease-in-out duration-300 not-italic">
                18 Main Street, Plettenberg Bay
              </address>
            </Link>
          </li>
        </ul>
        <MapComponent cssClasses="w-full aspect-square tablet:aspect-video" />
      </div>
      <Image
        src="/images/image4.jpeg"
        alt="The Lookout Centre, Plettenberg Bay"
        width={620}
        height={800}
        className="hidden desktop:block h-[678px] object-cover"
      />
    </section>
  );
};

export default ContactComponent;
