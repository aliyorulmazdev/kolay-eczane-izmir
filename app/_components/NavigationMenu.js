"use client";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";

const NavigationMenu = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <Menubar className="fixed bottom-0 w-full flex justify-center items-center px-4 gap-0 h-14 pr-5 pl-5 z-20">
      <MenubarMenu>
        <Link href="/">
          <Button onClick={handleRefresh} variant="ghost">Anasayfa</Button>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link href="https://www.linkedin.com/in/ali-yorulmaz-1a67a518a/">
          <Button variant="ghost">Dev</Button>
        </Link>
      </MenubarMenu>
      <ModeToggle />
    </Menubar>
  );
};

export default NavigationMenu;
