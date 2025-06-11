import GallerySlider from "./gallery-slider";

import galleryData from "@/_data/general-data.json";

const { gallerySlider } = galleryData;

const GalleryComponent = () => {
  return (
    <section className="space-y-10">
      <h2>Gallery</h2>
      <GallerySlider
        cssClasses="aspect-[4/3] tablet:aspect-video desktop:aspect-auto desktop:h-[440px]"
        data={gallerySlider}
      />
    </section>
  );
};

export default GalleryComponent;
