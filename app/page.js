"use client";
// page.js
import React, { useState } from "react";
import LocationForm from "./_components/LocationForm";
import ModeSelection from "./_components/ModeSelection";
import DirectionsDisplay from "./_components/DirectionsDisplay";
import Header from "./_components/Header";
import PharmacyInformation from "./_components/PharmacyInformation";
import LoadingPillIcon from "./_components/LoadingPillIcon";

export default function Home() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(null);
    const [directions, setDirections] = useState(null);
    const [pharmacy, setPharmacy] = useState(null);
    const [showInformation, setShowInformation] = useState(false);

    // Define event handlers
    const handleLocationSubmit = (latitude, longitude) => {
        setLatitude(latitude);
        setLongitude(longitude);
    };

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
        if (latitude !== null && longitude !== null) {
            fetchDirections(selectedMode, latitude, longitude);
        }
    };

    const fetchDirections = async (travelMode, latitude, longitude) => {
        setLoading(true);
        try {
            const response = await fetch(
                `/api/pharmacy?lat=${latitude}&long=${longitude}&mode=${travelMode}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDirections(data.directions);
            setPharmacy(data.shortestPharmacy);
            setShowInformation(true); // Show pharmacy information after fetching directions
        } catch (error) {
            console.error("Error fetching directions:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="container max-w-md space-y-8 px-4 py-12 text-center">
                {/* Location Form */}
                {latitude === null && longitude === null && (
                    <>
                        <Header />
                        <LocationForm
                            onSubmit={handleLocationSubmit}
                            loading={loading}
                        />
                    </>
                )}

                {/* Mode Selection */}
                {latitude !== null && longitude !== null && mode === null && (
                    <ModeSelection onSelectMode={handleModeSelect} />
                )}

                {/* Pharmacy Information */}
                {showInformation && (
                    <PharmacyInformation
                        pharmacy={pharmacy}
                        onGetDirections={() => setShowInformation(false)}
                        loading={loading}
                    />
                )}

                {/* Loading Pill Icon */}
                <LoadingPillIcon visible={loading} />

                {/* Directions Display */}
                {directions !== null && !showInformation && (
                    <DirectionsDisplay
                        directions={directions}
                        shortestPharmacy={pharmacy}
                        travelMode={mode}
                    />
                )}
            </div>
        </div>
    );
}
