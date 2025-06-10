import ButtonLink from "@/_components/ui/buttons/button-link";
import Image from "next/image";

const AboutUs = () => {
  return (
    <main className="space-y-10">
      <h2>About Us</h2>
      <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-3">
        <Image
          src="/images/hero/hero-2.jpeg"
          alt="The Lookout Centre - Plettenberg Bay"
          width={800}
          height={500}
          className="aspect-[2/1.25] h-full w-full object-cover"
        />
        <p className="tablet:col-span-2 tablet:order-first desktop:col-span-1">
          Nestled in the heart of Plettenberg Bay, the Lookout Centre is a
          hidden gem housed in a charming, historic building that exudes
          character and warmth. This unique destination offers a curated
          collection of boutique stores and delightful eateries, perfect for
          leisurely browsing and relaxed dining. From fashion and home décor to
          beauty salons, local artwork, and a cosy bookstore, there's something
          to discover around every corner. Whether you're a local or a visitor,
          the Lookout Centre invites you to explore, unwind, and enjoy an
          experience full of charm and creativity.
        </p>
        <ButtonLink
          href="/#stores"
          ariaLabel="Explore Our Stores"
          cssClasses="tablet:hidden"
        >
          View Our Stores
        </ButtonLink>
        <Image
          src="/images/hero/hero-3.jpeg"
          alt="The Lookout Centre - Plettenberg Bay"
          width={800}
          height={500}
          className="aspect-[2/1.25] h-full w-full object-cover"
        />
      </div>
    </main>
  );
};

export default AboutUs;
