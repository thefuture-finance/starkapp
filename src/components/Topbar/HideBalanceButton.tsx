"use client";

import { useHideBalance } from "@/store/hideBalance";
import { Eye, EyeOff } from "lucide-react";

export function HideBalanceButton() {
  const { isHide, setIsHide } = useHideBalance();

  if (isHide)
    return (
      <EyeOff
        className="cursor-pointer hover:text-foreground text-muted-foreground"
        onClick={() => setIsHide(false)}
        size={20}
      />
    );

  return (
    <Eye
      className="cursor-pointer hover:text-foreground text-muted-foreground"
      onClick={() => setIsHide(true)}
      size={20}
    />
  );
}
