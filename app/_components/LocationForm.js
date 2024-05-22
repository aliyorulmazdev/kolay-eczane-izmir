"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const LocationForm = ({ onSubmit, loading }) => {
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    onSubmit(latitude, longitude); // Pass latitude and longitude to parent component
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setError("Error getting location. Please try again."); // Set error state if geolocation fails
                }
            );
        }
    };

    return (
        <form className="flex justify-center" onSubmit={handleSubmit}>
            <Button
                className="px-4 py-2"
                type="submit"
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center space-x-2">
                        <svg
                            className="h-5 w-5 animate-spin text-secondary dark:text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm13-2.647A7.962 7.962 0 0120 12h-4c0 3.042-1.135 5.824-3 7.938l-3-2.647z"
                            ></path>
                        </svg>
                        <span>Yükleniyor...</span>
                    </div>
                ) : (
                    "Konum Bilgilerine Erişmemiz İçin İzin Ver"
                )}
            </Button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    );
};

export default LocationForm;
