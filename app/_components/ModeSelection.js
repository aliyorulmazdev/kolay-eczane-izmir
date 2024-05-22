import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";
import { PillIcon } from "lucide-react"

const ModeSelection = ({ onSelectMode }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="container max-w-md space-y-8 px-4 py-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 sm:text-4xl md:text-6xl">
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent dark:from-primary dark:to-gray-500">
                Çok az kaldı.
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Sadece ulaşım yolunu belirtmene ihtiyacımız var.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <Button
          className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-primary p-6 transition-all hover:scale-105 hover:shadow-lg dark:bg-white"
          onClick={() => onSelectMode("cycling-regular")}
        >
          <PillIcon className="h-3 w-3 animate-spin text-primary" /> Bisiklet
        </Button>
        <Button
          className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-primary p-6 transition-all hover:scale-105 hover:shadow-lg dark:bg-white"
          onClick={() => onSelectMode("foot-walking")}
        >
          <Label className="text-sm font-medium text-white dark:text-black">
            Yürüyüş
          </Label>
        </Button>
        <Button
          className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-primary p-6 transition-all hover:scale-105 hover:shadow-lg dark:bg-white"
          onClick={() => onSelectMode("driving-car")}
        >
          <Label className="text-sm font-medium text-white dark:text-black">
            Araç
          </Label>
        </Button>
      </div>
    </>
  );
};

export default ModeSelection;
