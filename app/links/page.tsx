import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "./link";
import CreateLink from "./create-link";
import DeleteLinkButton from "./delete-link-button";
import EditLinkButton from "./edit-link-button";
import DropDown from "@/components/DropDown";

import {DropdownMenu, DropdownMenuItem} from "@/components/DropDown2"
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default async function Links() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: links } = await supabase
    .from("links")
    .select()
    .eq("auth_id", session?.user.id);

  return (
    <>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold w-5/6 mt-4 mb-4">
        Links
      </h2>

      <CreateLink />
      <div className="links flex flex-col gap-2">
        {links?.map((link) => {
          return (
            <Link key={link.id} title={link.title} url={link.url}>
              {/* <details id="dropdown" className="dropdown dropdown-left">
                <summary tabIndex={0} className="btn btn-xs m-1">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </summary>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <EditLinkButton linkId={link.id} linkTitle={link.title} linkUrl={link.url}/>
                  </li>
                  <li>
                    <a>
                      <DeleteLinkButton linkId={link.id} />
                    </a>
                  </li>
                </ul>
              </details> */}
              {/* <DropDown>
                <EditLinkButton linkId={link.id} linkTitle={link.title} linkUrl={link.url}/>
                <DeleteLinkButton linkId={link.id} />
              </DropDown> */}
              <DropdownMenu>
                <DropdownMenuTrigger>...</DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem><EditLinkButton linkId={link.id} linkTitle={link.title} linkUrl={link.url}/></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Link>
          );
        })}
      </div>
    </>
  );
}
