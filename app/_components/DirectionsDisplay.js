import { Button } from "@/components/ui/button";
import React from "react";

const DirectionsDisplay = ({ directions, shortestPharmacy }) => {
    let prevInstruction = "";

    const handleOpenGoogleMaps = () => {
        if (
            shortestPharmacy &&
            shortestPharmacy.LokasyonX &&
            shortestPharmacy.LokasyonY
        ) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${shortestPharmacy.LokasyonX},${shortestPharmacy.LokasyonY}`;
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
        <div className="relative mx-auto grid max-h-[calc(100vh-200px)] max-w-[calc(100vw-100px)] gap-4 overflow-y-auto pb-6 pl-6 pr-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
            {directions.map((step, index) => {
                if (step.instruction === prevInstruction) {
                    return null;
                }

                prevInstruction = step.instruction;

                return (
                    <div
                        key={index}
                        className="relative grid gap-1 text-left text-sm"
                    >
                        <div className="absolute left-0 top-1 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-gray-900 dark:bg-gray-50" />
                        <div className="flex items-center gap-2">
                            <div className="font-medium">
                                {step.instruction.replace(
                                    "şekildeda",
                                    "şekilde"
                                )}{" "}
                                - {step.distance} metre | Tahmini{" "}
                                {step.duration} saniye
                            </div>
                        </div>
                    </div>
                );
            })}
            <div>
                <Button variant="default" onClick={handleOpenGoogleMaps}>
                    Google Haritalara Bağlan
                </Button>
                <Button
                    variant="default"
                    className="mt-3"
                    onClick={handleOpenAppleMaps}
                >
                    Apple Haritalarına Bağlan
                </Button>
            </div>
        </div>
    );
};

export default DirectionsDisplay;
