import { CircleHelp, Eye, EyeOff } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ThemeButton } from "../ThemeButton";
import { HideBalanceButton } from "./HideBalanceButton";

export function Topbar() {
  return (
    <div className="border-b border-border py-4 flex justify-between items-center mt-6">
      <div className="">
        <SearchBar selectedAddress="" />
      </div>
      <div className="flex gap-6 items-center">
        <div>
          <HideBalanceButton />
        </div>

        <div>
          <CircleHelp size={20} />
        </div>

        <div>
          <ThemeButton />
        </div>

        <div></div>
      </div>
    </div>
  );
}
