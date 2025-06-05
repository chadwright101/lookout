import HeroSlider from "@/_components/pages/home-page/hero/hero-slider";

import data from "@/_data/general-data.json";

const { heroSlider } = data;

const HeroComponent = () => {
  return (
    <section className="max-w-[1280px] mx-auto -z-10">
      <div className="overflow-hidden bg-darkGrey">
        <HeroSlider
          data={heroSlider}
          cssClasses="h-[250px] phone:h-[350px] tablet:h-[450px] desktop:h-[600px]"
        />
      </div>
    </section>
  );
};

export default HeroComponent;
