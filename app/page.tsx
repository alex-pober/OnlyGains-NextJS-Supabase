import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import SupabaseLogo from "../components/SupabaseLogo";
import NextJsLogo from "../components/NextJsLogo";

export const dynamic = "force-dynamic";

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 lg:py-16 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-4">
          <p className="text-2xl md:text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-6">
            More Than Just "Links in Bio"<br />
            <strong>Workouts</strong> + <strong>Links</strong> = <strong>OnlyGains</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
