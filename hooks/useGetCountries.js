/**
 * Title: Write a program using JavaScript on UseGetCountries
.
 * Date: 17, August 2023
 */

import { useEffect, useState } from "react";

export default function useGetCountries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => {
          return {
            name: country.name.common,
            flag: country.flags.svg,
            latlng: country.latlng,
          };
        });

        const sortedCountries = countries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCountries(sortedCountries);
      });
  }, []);

  return countries;
}
