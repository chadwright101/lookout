import AboutUs from "@/_components/pages/home-page/about-us";
import HeroComponent from "@/_components/pages/home-page/hero/hero-component";

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <HeroComponent />
      <div className="mt-15 px-5 space-y-[60px] desktop:px-10">
        <AboutUs />
      </div>
    </div>
  );
}
