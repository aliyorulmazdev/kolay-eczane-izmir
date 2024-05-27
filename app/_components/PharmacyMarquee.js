"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const PharmacyCard = ({ name, address, phone }) => {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40">{address}</p>
        <p className="text-xs font-medium dark:text-white/40">{phone}</p>
      </div>
    </figure>
  );
};

const MarqueeDemo = () => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch("/api/pharmacy");
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error("Error fetching pharmacy data:", error);
      }
    };

    fetchPharmacies();
  }, []);

  const firstRow = pharmacies.slice(0, Math.ceil(pharmacies.length / 2));
  const secondRow = pharmacies.slice(Math.ceil(pharmacies.length / 2));

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-20 ">
      <Marquee pauseOnHover className="[--duration:80s]">
        {firstRow.map((pharmacy) => (
          <PharmacyCard
            key={pharmacy.Telefon}
            name={pharmacy.Adi}
            address={pharmacy.Adres}
            phone={pharmacy.Telefon}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:80s]">
        {secondRow.map((pharmacy) => (
          <PharmacyCard
            key={pharmacy.Telefon}
            name={pharmacy.Adi}
            address={pharmacy.Adres}
            phone={pharmacy.Telefon}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default MarqueeDemo;
