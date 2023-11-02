"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"

export default function NavBar({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
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
    // <div className="drawer drawer-end">
    //   <input
    //     id="my-drawer-3"
    //     type="checkbox"
    //     className="drawer-toggle"
    //     checked={drawerOpen}
    //   />
    //   <div className="drawer-content flex flex-col">
    //     {/* Navbar */}
    //     <div className="navbar bg-base-100">
    //       {/* Logo */}
    //       <div className="flex-1">
    //         <a className="btn btn-ghost normal-case text-xl">OnlyGains</a>
    //       </div>
    //       {/* Mobile drawer icon */}
    //       <div className="flex-none md:hidden">
    //         <label
    //           htmlFor="my-drawer-3"
    //           className="btn btn-square btn-ghost"
    //           onClick={() => setDrawerOpen((prev) => !prev)}
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             className="inline-block w-6 h-6 stroke-current"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M4 6h16M4 12h16M4 18h16"
    //             ></path>
    //           </svg>
    //         </label>
    //       </div>
    //       {/* Navbar menu content here LARGE */}
    //       <div className="flex-none hidden md:block">
    //         <ul className="menu menu-horizontal">
    //           <li>
    //             <Link
    //               href="/dashboard"
    //               className="btn-ghost normal-case text-base"
    //             >
    //               Dashboard
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               href="/workouts"
    //               className="btn-ghost normal-case text-base"
    //             >
    //               Workouts
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/links" className="btn-ghost normal-case text-base">
    //               Links
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               href="/account"
    //               className="btn-ghost normal-case text-base"
    //             >
    //               Account
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   {/* Sidedrawer content here */}
    //   <div className="drawer-side z-50">
    //     <label
    //       htmlFor="my-drawer-3"
    //       className="drawer-overlay"
    //       onClick={() => setDrawerOpen((prev) => !prev)}
    //     ></label>
    //     <ul className="menu p-4 sm:w-80 h-full bg-base-200 pt-16">
    //       <li>
    //         <Link
    //           href="/dashboard"
    //           className="btn-ghost normal-case text-lg"
    //           onClick={() => setDrawerOpen((prev) => !prev)}
    //         >
    //           Dashboard
    //         </Link>
    //       </li>
    //       <div className="divider m-0"></div>
    //       <li>
    //         <Link
    //           href="/workouts"
    //           className="btn-ghost normal-case text-lg"
    //           onClick={() => setDrawerOpen((prev) => !prev)}
    //         >
    //           Workouts
    //         </Link>
    //       </li>
    //       <div className="divider m-0"></div>
    //       <li>
    //         <Link
    //           href="/links"
    //           className="btn-ghost normal-case text-lg"
    //           onClick={() => setDrawerOpen((prev) => !prev)}
    //         >
    //           Links
    //         </Link>
    //       </li>
    //       <div className="divider m-0"></div>
    //       <li>
    //         <Link
    //           href="/account"
    //           className="btn-ghost normal-case text-lg"
    //           onClick={() => setDrawerOpen((prev) => !prev)}
    //         >
    //           Account
    //         </Link>
    //       </li>
    //       <div className="divider m-0"></div>
    //     </ul>
    //   </div>
    // </div>
    <main className="flex">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">OnlyGains</a>
      </div>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Overview
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Customers
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Products
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link>
      </nav>
    </main>
  );
}
