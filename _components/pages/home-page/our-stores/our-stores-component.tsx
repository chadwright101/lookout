import StoreSlider from "./store-slider";

import generalData from "@/_data/general-data.json";

const OurStoresComponent = () => {
  return (
    <section className="space-y-5">
      <h2>Our Stores</h2>
      <div className="py-5 border-y-4 border-beige desktop:border-none desktop:py-0">
        <div className="overflow-x-hidden">
          <StoreSlider data={generalData.ourStores} />
        </div>
      </div>
    </section>
  );
};

export default OurStoresComponent;
