import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

interface Props {
  cssClasses?: string;
}

const libraries: "marker"[] = ["marker"];

const MapComponent = ({ cssClasses }: Props) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: { lat: -34.053594644038654, lng: 23.372202513493445 },
        title: "The Lookout Centre",
      });
    }
  }, []);

  const onUnmount = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.map = null;
      markerRef.current = null;
    }
    mapRef.current = null;
  }, []);

  if (!isLoaded)
    return (
      <div
        className={`bg-beige grid place-items-center py-16 max-w-[1280px] ${cssClasses}`}
      >
        <p className="text-heading font-thin">Map loading...</p>
      </div>
    );

  return (
    <GoogleMap
      zoom={16}
      center={{ lat: -34.053594644038654, lng: 23.372202513493445 }}
      mapContainerClassName={cssClasses}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      options={{
        mapId: "lookout-centre-map",
      }}
    />
  );
};

export default MapComponent;
