import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AvatarIcon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../../public/cryptoquay.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleNavigate = () => {
    if (auth.user) {
      auth.user.role === "ROLE_ADMIN" ? navigate("/admin/withdrawal") : navigate("/profile")
    }
  }
  return (
    <>
      {/* <div className="px-2 py-3 border-b z-50 bg-orange-400 bg-opacity-1 sticky top-0 left-0 right-0 flex justify-between items-center">
        <div className="flex items-center gap-3 ">
          <Sheet className="">
            <SheetTrigger>
              <Button
                className="rounded-full h-11 w-11"
                variant="ghost"
                size="icon"
              >
                <DragHandleHorizontalIcon className=" h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-72  border-r-0 flexs flex-col  justify-center"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>
                  <div className="text-3xl flex justify-center  items-center gap-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
                    </Avatar>
                    <div>
                      <span className="font-bold text-orange-700">Crypto</span>
                      <span>Quay</span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <p
            onClick={() => navigate("/")}
            className="text-lg lg:text-xl cursor-pointer font-bold"
          >
            CryptoQuay
          </p>
          <div className=" p-0 ml-[410px]">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="flex items-center gap-3 w-[300px] shadow-md rounded-full"
            >
              {" "}
              <MagnifyingGlassIcon className="left-2 top-3 " />
              <span>Search</span>
            </Button>
          </div>
        </div>
        <div>
          <Avatar className="cursor-pointer" onClick={handleNavigate}>
            {!auth.user ? (
              <AvatarIcon className=" h-8 w-8" />
            ) : (
              <AvatarFallback>{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </div>
      </div> */}


      <div className="px-4 py-3 border-b z-50 bg-gradient-to-b from-gray-900 to-gray-800 sticky top-0 left-0 right-0 flex justify-between items-center text-white">
        <div className="flex items-center gap-4 w-full">
          <Sheet>
            <SheetTrigger>
              <Button className="rounded-full h-10 w-10" variant="ghost" size="icon">
                <DragHandleHorizontalIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-72 border-r-0 flex flex-col justify-center bg-gray-900 text-white" side="left">
              <SheetHeader>
                <SheetTitle>
                  <div className="text-2xl flex justify-center items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
                    </Avatar>
                    <div>
                      <span className="font-bold text-yellow-400">Crypto</span>
                      <span className="text-white">Quay</span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <p onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">
            CryptoQuay
          </p>
        </div>

        <div className="flex w-4 md:w-full justify-end mx-4">
          <Button variant="outline" onClick={() => navigate("/search")} className="flex items-center gap-3 w-[250px] md:w-[300px] shadow-md rounded-full bg-gray-700 border-gray-600">
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span className="hidden md:block">Search</span>
          </Button>
        </div>

        <div>
          <Avatar className="cursor-pointer" onClick={handleNavigate}>
            {!auth.user ? (
              <AvatarIcon className="h-8 w-8 text-white" />
            ) : (
              <AvatarFallback className="text-cyan-600 font-bold">
                {auth.user?.fullName[0].toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;
