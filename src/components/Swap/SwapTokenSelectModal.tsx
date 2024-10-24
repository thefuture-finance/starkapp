import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useEffect, useState } from "react";
import { Networks, useSupportedTokens } from "@/hooks/useSupportedTokens";
import { Token } from "fibrous-router-sdk";

// export function TokenSelectDialog({
//   onSelectToken,
// }: {
//   onSelectToken?: () => void;
// }) {
//   return (
//     <Dialog>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Select Token For Swap</DialogTitle>
//         </DialogHeader>
//         <Input />
//       </DialogContent>
//     </Dialog>
//   );
// }
//
//
export type TokenSelectDialogProps = {
  network: Networks;
  onSelect: (token: Token) => void;
  selectedToken?: Token;
};
export function TokenSelectDialog({
  network,
  onSelect,
  selectedToken,
}: TokenSelectDialogProps) {
  const tokens = useSupportedTokens(network) || {};

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-3 justify-center items-center p-2 bg-primary/50 rounded-sm hover:bg-primary/70 cursor-pointer text-white">
          <Image
            alt="tokenImage"
            src={selectedToken?.image_url}
            className="w-6 h-6"
            width={32}
            height={32}
          />
          {selectedToken?.symbol}
          <ChevronDown />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Token For Swap</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Type a token name to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Tokens">
              <ScrollArea className="h-full flex flex-col grow rounded-md">
                {Object.values(tokens)
                  .filter((token) => {
                    return token.verified;
                  })
                  .map((token, index) => (
                    <CommandItem
                      key={index}
                      className="z-20 gap-2 cursor-pointer"
                      onSelect={() => {
                        setOpen(false);
                        onSelect(token);
                      }}
                    >
                      <Image
                        alt="tokenImage"
                        src={token.image_url}
                        className="w-6 h-6"
                        width={32}
                        height={32}
                      />

                      {token.symbol}
                    </CommandItem>
                  ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
