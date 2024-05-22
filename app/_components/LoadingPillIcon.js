import React from "react";
import { PillIcon } from "lucide-react";

const LoadingPillIcon = ({ visible }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        visible ? "block" : "hidden"
      }`}
    >
      {visible && (
        <div className="flex flex-col items-center justify-center">
          <div className="container max-w-md space-y-8 px-4 py-12 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 sm:text-4xl md:text-6xl">
                <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent dark:from-primary dark:to-gray-500">
                  Oldu bile!
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Senin için en yakın eczane bilgilerine ulaşıyoruz...
              </p>
            </div>
          </div>
          <PillIcon className="h-24 w-24 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default LoadingPillIcon;
