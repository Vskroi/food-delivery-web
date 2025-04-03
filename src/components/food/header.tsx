import { User } from "lucide-react";
import { SheetComponent } from "./sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { useUserData } from "@/providers/AuthenticationProvider";

export const Header = () => {
  const router = useRouter();
  const data = useUserData();
  console.log(data);
  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <>
      <div className="w-full bg-black h-[68px] flex items-center justify-around">
        <div className="flex">
          <img src="../Screenshot2024-12-17at18.02.181(Traced).svg" alt="" />
          <div className=" inline-flex flex-col justify-start items-start">
            <div className="justify-start text-white">
              <span className="text-xl font-semibold leading-7">Nom</span>
              <span className="text-xl text-red-600 font-semibold leading-7">
                Nom
              </span>
            </div>
            <div className="text-center justify-start text-xs font-normal leading-none text-white">
              Swift delivery
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {/*  <input  name="" id="" /> */}
          <SheetComponent />

          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                {" "}
                <User />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{data?.data.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex justify-center h-"
                onClick={signOut}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
