import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";

const NavigationMenu = () => {
  return (
    <Menubar className="flex justify-center items-center px-4 gap-0 w-full h-14 pr-5 pl-5">
      <MenubarMenu>
        <Link href="/">
          <Button variant="ghost">Anasayfa</Button>
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
