import AboutUs from "@/_components/pages/home-page/about-us";
import ContactComponent from "@/_components/pages/home-page/contact/contact-component";
import GalleryComponent from "@/_components/pages/home-page/gallery/gallery-component";
import HeroComponent from "@/_components/pages/home-page/hero/hero-component";
import OurStoresComponent from "@/_components/pages/home-page/our-stores/our-stores-component";

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <HeroComponent />
      <div className="mt-15 px-5 space-y-[60px] desktop:px-10">
        <div id="about" className="-translate-y-28" />
        <AboutUs />
        <div id="stores" className="-translate-y-28" />
        <OurStoresComponent />
        <div id="gallery" className="-translate-y-28" />
        <GalleryComponent />
        <div id="contact" className="-translate-y-28" />
        <ContactComponent />
      </div>
    </div>
  );
}
