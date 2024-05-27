import React from "react";

const Header = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="container max-w-md space-y-8 px-4 py-12 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 sm:text-4xl md:text-6xl dark:text-primary">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent dark:from-primary dark:to-gray-500">
                            İlacın bir adım uzağında.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Nöbetçi Eczane bilgilerine mi ihtiyacın var? Hiç sorun
                        değil.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;
