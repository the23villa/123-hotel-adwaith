import { useState, useEffect } from "react";

const districtData = [
  { name: "Karjat", flag: "/path/to/karjat-icon.svg", latlng: [18.9102, 73.3289] },
  { name: "Alibaug", flag: "/path/to/alibaug-icon.svg", latlng: [18.6414, 72.8722] },
  { name: "Lonavala", flag: "/path/to/lonavala-icon.svg", latlng: [18.7546, 73.4062] },
  { name: "Manali", flag: "/path/to/manali-icon.svg", latlng: [32.2432, 77.1892] }
];

export default function useGetCountries() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Simulate an API call with a setTimeout
    setTimeout(() => {
      setDistricts(districtData);
    }, 100);
  }, []);

  return districts;
}