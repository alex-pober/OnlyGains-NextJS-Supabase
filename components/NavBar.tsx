"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"
import { Menu , LayoutGrid, Dumbbell, Link2, User2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const supabase = createClientComponentClient();
  const router = usePathname();

  // Check the current route
  if (router === "/account/set-up") {
    // Do not render the component
    return null;
  }

  //pretty sure this isnt needed.
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
    };

    getUser();
  }, []);

  return (
    <main className="flex md:m-auto mx-4  h-12 justify-center items-center md:max-w-3xl">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">OnlyGains</a>
      </div>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
        >
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <span>Workouts</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link2 className="mr-2 h-4 w-4" />
                  <span>Links</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Account</span></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        <div className="flex gap-5 md:flex hidden">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/workouts"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Workouts
          </Link>
          <Link
            href="/links"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Links
          </Link>
          <Link
            href="/account"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Account
          </Link>
        </div>
      </nav>
    </main>
  );
}
