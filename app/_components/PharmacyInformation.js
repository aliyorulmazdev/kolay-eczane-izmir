import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneIcon, LocateIcon, PillIcon } from "lucide-react";
import React from "react";

const PharmacyInformation = ({ pharmacy, onGetDirections, loading }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        return new Intl.DateTimeFormat("tr-TR", options).format(date);
    };

    return (
        <>
            {pharmacy == null && (
                <PillIcon className="h-10 w-10 text-red-500" />
            )}

            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <PillIcon className="h-10 w-10 text-primary" />
                        <div>
                            <CardTitle>{pharmacy.Adi}</CardTitle>
                            <CardDescription>
                                {pharmacy.Bolge} - {formatDate(pharmacy.Tarih)}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center gap-3">
                        <PhoneIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span>{pharmacy.Telefon}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <LocateIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span>{pharmacy.Adres}</span>
                    </div>
                    <Button onClick={onGetDirections} disabled={loading}>
                        Yol tarifi almak istiyorum
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default PharmacyInformation;
