// export function CommunityCard() {
//   return (
//     <div>
//       <div></div>
//     </div>
//   );
// }
//

"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { useSidebarToogle } from "@/store/sidebarToogle";

export function CommunityCard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const sidebar = useSidebarToogle();

  const isOpenCard = React.useMemo(() => {
    return sidebar.isOpen ? isOpen : false;
  }, [sidebar.isOpen, isOpen]);

  return (
    <Collapsible
      open={isOpenCard}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          <Link href="">
            <div className="hover:bg-muted rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </Link>
          <Link href="">
            <div className="hover:bg-muted rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </Link>
          <Link href="">
            <div className="hover:bg-muted rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </Link>
        </div>
      </CollapsibleContent>

      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="justify-start text-md w-full p-0 hover:text-foreground text-muted-foreground hover:bg-card"
          >
            {sidebar.isOpen ? "Community" : null}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
}
