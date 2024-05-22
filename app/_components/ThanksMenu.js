import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ThanksMenu = () => {
  return (
    <Menubar className="fixed bottom-16 w-full flex justify-center items-center px-4 gap-6 h-10 z-20">
      <MenubarMenu>
        <Link href="https://acikveri.bizizmir.com/">
          <Button variant='ghost'>İzmir Büyükşehir Belediyesi Açık Veri Portalı</Button>
        </Link>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThanksMenu;
