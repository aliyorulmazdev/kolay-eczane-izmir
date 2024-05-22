import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneIcon, LocateIcon, PillIcon } from "lucide-react";
import React from "react";

const PharmacyInformation = ({ pharmacy, onGetDirections, loading }) => {
  const handleDownloadVCard = () => {
    // Create contact object
    const contact = {
      name: pharmacy.Adi,
      phone: pharmacy.Telefon,
    };
    // Create vCard content
    const vcard = `BEGIN:VCARD\nVERSION:4.0\nFN:${contact.name}\nTEL;TYPE=work,voice:${contact.phone}\nEND:VCARD`;
    // Create Blob object
    const blob = new Blob([vcard], { type: "text/vcard" });
    // Create object URL
    const url = URL.createObjectURL(blob);
    // Create link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${contact.name}.vcf`);
    // Dispatch click event
    link.dispatchEvent(new MouseEvent("click"));
    // Cleanup
    URL.revokeObjectURL(url);
  };
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
      {pharmacy == null && <PillIcon className="h-10 w-10 text-red-500" />}

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
            <Button
              size="sm"
              variant="ghost"
              className=" bg-gray-100 dark:bg-secondary hover:bg-gray-300"
              onClick={handleDownloadVCard}
              disabled={loading}
            >
              Rehbere Kaydet
            </Button>
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
