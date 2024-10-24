import Link from "next/link";
import { ReactNode } from "react";

export function SidebarElement({
  children,
  href,
  target,
}: {
  children?: Readonly<ReactNode>;
  href?: Readonly<string>;
  target?: Readonly<string>;
}) {
  if (href)
    return (
      <Link href={href} target={target}>
        <div className="flex items-center gap-2 cursor-pointer hover:text-foreground text-muted-foreground p-3">
          {children}
        </div>
      </Link>
    );

  return (
    <div className="flex gap-2 cursor-pointer hover:text-foreground text-muted-foreground p-3">
      {children}
    </div>
  );
}
