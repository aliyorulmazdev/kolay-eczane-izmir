import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
        <Link href="/">
          <Button variant="ghost">Ara</Button>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link href="/">
          <Button variant="ghost">
            <PillIcon className="w-8 h-8" />
          </Button>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
      <Link href="/">
          <Button variant="ghost">Dev</Button>
        </Link>
      </MenubarMenu>
      <ModeToggle />
    </Menubar>
  );
};

export default NavigationMenu;


function PillIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}
