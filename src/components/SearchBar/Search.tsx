import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check, SquareX } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  onDeleteRecentSearch: (address: string) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: { address: T; name: string }[];
  historyItems: any[];
  hideNotFound?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
};

export default function AutoCompleteSearch<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  onDeleteRecentSearch,
  historyItems,
  items,
  hideNotFound = true,
  isLoading,
  emptyMessage = "No items.",
  placeholder = "Search...",
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.address] = item.name;
          return acc;
        },
        {} as Record<string, string>,
      ),
    [items],
  );

  const reset = () => {
    onSelectedValueChange("" as T);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute("cmdk-list") &&
      labels[selectedValue] !== searchValue
    ) {
      onSearchValueChange(labels[selectedValue]);
    }
  };

  const onSelectItem = (inputValue: string) => {
    onSelectedValueChange(inputValue as T);
    onSearchValueChange("");
    setOpen(false);
  };

  return (
    <div className="flex w-[470px] items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => {
                setOpen(e.key !== "Escape");
                console.log(searchValue);
                if (e.key == "Enter" && !items?.length) {
                  onSelectItem(searchValue);
                }
              }}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
              className="text-foreground w-full bg-card p-3"
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className={`w-[--radix-popover-trigger-width] p-0 bg-card `}
          >
            <CommandList
              className={`${!!items?.length || !hideNotFound || !searchValue?.length ? "" : "border-[0px]"}`}
            >
              {isLoading && !!searchValue?.length && (
                <CommandPrimitive.Loading>
                  <div className="p-1 text-foreground">
                    {searchValue}
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {!searchValue?.length && !!historyItems?.length && (
                <CommandGroup>
                  {historyItems.map((option, index) => (
                    <div
                      key={index}
                      className="w-full flex gap-2 justify-between items-center pr-2"
                    >
                      <CommandItem
                        className={cn(
                          "flex py-3 text-card-foreground grow",
                          selectedValue === option.address
                            ? "bg-secondary"
                            : "bg-card",
                        )}
                        value={option?.address}
                        onMouseDown={(e: any) => e.preventDefault()}
                        onSelect={onSelectItem}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValue === option.address
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {option?.name || option?.address}
                      </CommandItem>
                      <div
                        onClick={() => onDeleteRecentSearch(option.address)}
                        className="shrink-0 cursor-pointer hover:text-foreground w-8 h-8 text-foreground/70 rounded"
                      >
                        <SquareX className="w-full h-full" />
                      </div>
                    </div>
                  ))}
                </CommandGroup>
              )}
              {!!searchValue?.length && !!items?.length && !isLoading ? (
                <CommandGroup>
                  {items.map((option, index) => (
                    <CommandItem
                      className={cn(
                        "py-3 text-foreground",
                        selectedValue === option.address
                          ? "bg-primary"
                          : "bg-card",
                      )}
                      key={index}
                      value={option?.address}
                      onMouseDown={(e: any) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-foreground",
                          selectedValue === option.address
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {option?.name || option?.address}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading && !hideNotFound ? (
                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
