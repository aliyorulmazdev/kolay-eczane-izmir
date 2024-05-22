"use server";

import { NextRequest, NextResponse } from "next/server";

// Haversine distance calculation function
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon1 - lon2) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

// Function to find the nearest pharmacies
const findNearestPharmacies = (userLat, userLong, pharmacies) => {
    return pharmacies
        .map(pharmacy => ({
            ...pharmacy,
            distance: haversineDistance(
                userLat,
                userLong,
                parseFloat(pharmacy.LokasyonX),
                parseFloat(pharmacy.LokasyonY)
            ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);
};

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") || "");
    const long = parseFloat(searchParams.get("long") || "");
    const mode = searchParams.get("mode");

    if (!lat || !long || !mode) {
        return NextResponse.json(
            { error: "Latitude, longitude, and travel mode are required" },
            { status: 400 }
        );
    }

    const PHARMACY_API_URL = "https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler";
    try {
        const response = await fetch(PHARMACY_API_URL);
        const data = await response.json();

        const nearestPharmacies = findNearestPharmacies(lat, long, data);

        const coordinates = nearestPharmacies.map(pharmacy => [
            parseFloat(pharmacy.LokasyonY),
            parseFloat(pharmacy.LokasyonX),
        ]);

        const ORS_API_KEY = "5b3ce3597851110001cf6248e0ceafa1b34a4b7f8d7699e695bf5594";
        const directionsUrl = `https://api.openrouteservice.org/v2/directions/${mode}/json`;

        // Define an array to store the duration for each pharmacy
        const durations = [];

        for (const pharmacy of nearestPharmacies) {
            const directionsResponse = await fetch(directionsUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: ORS_API_KEY,
                },
                body: JSON.stringify({
                    coordinates: [
                        [long, lat],
                        [
                            parseFloat(pharmacy.LokasyonY),
                            parseFloat(pharmacy.LokasyonX),
                        ],
                    ],
                    language: "tr-tr",
                }),
            });

            const directionsData = await directionsResponse.json();
            if (
                directionsData.routes &&
                directionsData.routes[0] &&
                directionsData.routes[0].summary
            ) {
                const duration = directionsData.routes[0].summary.duration; // Duration in seconds
                durations.push(duration);
            } else {
                console.error("Invalid directions data:", directionsData);
                return NextResponse.json(
                    { error: "Error fetching directions data" },
                    { status: 500 }
                );
            }
        }

        // Find the index of the pharmacy with the shortest duration
        const shortestDurationIndex = durations.indexOf(Math.min(...durations));

        // Get the nearest pharmacy with the shortest duration
        const shortestPharmacy = nearestPharmacies[shortestDurationIndex];

        // Fetch the directions for the shortest pharmacy
        const directionsResponse = await fetch(directionsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: ORS_API_KEY,
            },
            body: JSON.stringify({
                coordinates: [
                    [long, lat],
                    [
                        parseFloat(shortestPharmacy.LokasyonY),
                        parseFloat(shortestPharmacy.LokasyonX),
                    ],
                ],
                language: "tr-tr",
            }),
        });

        const directionsData = await directionsResponse.json();

        if (
            directionsData.routes &&
            directionsData.routes[0] &&
            directionsData.routes[0].segments &&
            directionsData.routes[0].segments[0].steps
        ) {
            const steps = directionsData.routes[0].segments[0].steps.map(
                (step) => ({
                    instruction: step.instruction,
                    distance: step.distance,
                    duration: step.duration,
                })
            );

            return NextResponse.json({
                shortestPharmacy,
                directions: steps,
            });
        } else {
            console.error("Invalid directions data:", directionsData);
            return NextResponse.json(
                { error: "Error fetching directions data" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Error fetching data" },
            { status: 500 }
        );
    }
}
