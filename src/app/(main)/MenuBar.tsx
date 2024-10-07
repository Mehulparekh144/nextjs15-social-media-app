import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

export function MenuBar({ className }: MenuBarProps) {
  return (
    <div className={className}>
      <Button
        variant={"ghost"}
        className="flex font-semibold items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href={"/"}>
          <span className="flex items-center gap-3">
            <Home />
            <span className="hidden lg:inline">Home</span>
          </span>
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        className="flex font-semibold items-center justify-start gap-3"
        title="Notification"
        asChild
      >
        <Link href={"/notifications"}>
          <span className="flex items-center gap-3">
            <Bell />
            <span className="hidden lg:inline">Notification</span>
          </span>
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        className="flex font-semibold items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        <Link href={"/messages"}>
          <span className="flex items-center gap-3">
            <Mail />
            <span className="hidden lg:inline">Messages</span>
          </span>
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        className="flex font-semibold items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href={"/bookmarks"}>
          <span className="flex items-center gap-3">
            <Bookmark />
            <span className="hidden lg:inline">Bookmarks</span>
          </span>
        </Link>
      </Button>
    </div>
  );
}
