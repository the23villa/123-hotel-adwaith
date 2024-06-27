import { useState, useEffect } from "react";

const districtData = {
  Karjat: { lat: 18.9102, lng: 73.3289 },
  Alibaug: { lat: 18.6414, lng: 72.8722 },
  Lonavala: { lat: 18.7546, lng: 73.4062 },
  Manali: { lat: 32.2432, lng: 77.1892 },
};

export default function useGetCountryLatLng(name) {
  const [latlng, setLatLng] = useState("");

  useEffect(() => {
    const getLocation = () => {
      const location = districtData[name];
      if (location) {
        setLatLng(`${location.lat}, ${location.lng}`);
      } else {
        setLatLng("");
      }
    };

    getLocation();
  }, [name]);

  return latlng;
}
