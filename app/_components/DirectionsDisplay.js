import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { AiOutlineNumber } from "react-icons/ai";

const DirectionsDisplay = ({ directions, shortestPharmacy, travelMode }) => {
  let prevInstruction = "";

  const handleOpenGoogleMaps = () => {
    if (
      shortestPharmacy &&
      shortestPharmacy.LokasyonX &&
      shortestPharmacy.LokasyonY
    ) {
      let mode;
      switch (travelMode) {
        case "cycling-regular":
          mode = "bicycling";
          break;
        case "foot-walking":
          mode = "walking";
          break;
        case "driving-car":
          mode = "driving";
          break;
        default:
          mode = "driving"; // Default to driving mode if no match
          break;
      }
      const url = `https://www.google.com/maps/dir/?api=1&destination=${shortestPharmacy.LokasyonX},${shortestPharmacy.LokasyonY}&travelmode=${mode}`;
      window.open(url, "_blank");
    } else {
      console.error("Shortest pharmacy coordinates are missing.");
    }
  };

  const handleOpenAppleMaps = () => {
    if (
      shortestPharmacy &&
      shortestPharmacy.LokasyonX &&
      shortestPharmacy.LokasyonY
    ) {
      const appleMapsUrl = `http://maps.apple.com/?daddr=${shortestPharmacy.LokasyonX},${shortestPharmacy.LokasyonY}`;
      window.open(appleMapsUrl, "_blank");
    } else {
      console.error("Shortest pharmacy coordinates are missing.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="container max-w-md space-y-8 px-4 py-12 text-center mb-7">
          <div className="space-y-4">
            {directions.map((step, index) => {
              if (step.instruction === prevInstruction) {
                return null;
              }

              prevInstruction = step.instruction;

              return (
                <div key={index}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-secondary rounded-full">
                      {index + 1}
                    </div>
                    <div className="font-medium">
                      <span>
                        {step.instruction.replace("şekildeda", "şekilde")}
                      </span>
                      <br />
                      <span> {step.distance} m. </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <Button variant="default" onClick={handleOpenGoogleMaps}>
              Google Haritalara Bağlan
            </Button>
            <Button variant="default" onClick={handleOpenAppleMaps}>
              Apple Haritalarına Bağlan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectionsDisplay;
