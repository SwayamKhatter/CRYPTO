import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import AccountVarificationForm from "./AccountVarificationForm";
import { VerifiedIcon } from "lucide-react";
import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleEnableTwoStepVerification = (otp) => {
    console.log("EnableTwoStepVerification", otp)
    dispatch(enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp }))
  }

  const handleVerifyOtp = (otp) => {
    console.log("otp  - ", otp)
    dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }))
  }
  return (
    // <div className="flex flex-col items-center mb-5 bg-gradient-to-t from-yellow-300 to-orange-400 h-screen">
    //   <div className="pt-10 w-full lg:w-[60%]">
    //     <Card className="w-full shadow-slate-600 shadow-md ">
    //       <CardHeader className="pb-9">
    //         <CardTitle>Your Information</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="lg:flex gap-32">
    //           <div className="space-y-7">
    //             <div className="flex">
    //               <p className="w-[9rem]">Full Name : </p>
    //               <p className="text-gray-500">{auth.user?.fullName} </p>
    //             </div>
    //             <div className="flex">
    //               <p className="w-[9rem]">Email : </p>
    //               <p className="text-gray-500">{auth.user?.email} </p>
    //             </div>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //     <div className="mt-6">
    //     <Card className="w-full shadow-slate-600 shadow-md">
    //         <CardHeader className="pb-7">
    //           <div className="flex items-center gap-3">
    //             <CardTitle>2 Step Verification</CardTitle>

    //             {auth.user.twoFactorAuth?.enabled ? (
    //               <Badge className="space-x-2 text-white bg-green-600">
    //                 <VerifiedIcon /> <span>{"Enabled"}</span>
    //               </Badge>
    //             ) : (
    //               <Badge className="bg-orange-500">Disabled</Badge>
    //             )}
    //           </div>
    //         </CardHeader>
    //         <CardContent className="space-y-5">

    //           <div>
    //             <Dialog>
    //               <DialogTrigger>
    //                 <Button>Enabled Two Step Verification</Button>
    //               </DialogTrigger>
    //               <DialogContent className="">
    //                 <DialogHeader className="">
    //                   <DialogTitle className="px-10 pt-5 text-center">
    //                     verify your account
    //                   </DialogTitle>
    //                 </DialogHeader>
    //                 <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
    //               </DialogContent>
    //             </Dialog>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //     <div className="lg:flex gap-5 mt-5">
    //       {/* <Card className="w-full">
    //         <CardHeader className="pb-7">
    //           <CardTitle>Change Password</CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-5 ">
    //           <div className="flex items-center">
    //             <p className="w-[8rem]">Email :</p>
    //             <p>{auth.user.email}</p>
    //           </div>

    //           <div className="flex items-center">
    //             <p className="w-[8rem]">Password :</p>
    //             <Button variant="secondary">Change Password</Button>
    //           </div>
    //         </CardContent>
    //       </Card> */}
    //       {/* <Card className="w-full">
    //         <CardHeader>
    //           <CardTitle>Close Account</CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-5 ">
    //           <div className="flex items-center">
    //             <p className="w-[8rem]">Customer Id :</p>
    //             <p>#53DKJ736</p>
    //           </div>
    //           <div className="flex items-center">
    //             <p className="w-[8rem]">Account :</p>
    //             <Button variant="secondary">Close Account</Button>
    //           </div>
    //         </CardContent>
    //       </Card> */}
    //       <Card className="w-full shadow-slate-600 shadow-md">
    //         <CardHeader className="pb-7">
    //           <div className="flex items-center gap-3">
    //             <CardTitle>Account Status</CardTitle>

    //             {auth.user.verified ? (
    //               <Badge className="space-x-2 text-white bg-green-600">
    //                 <VerifiedIcon /> <span>verified</span>
    //               </Badge>
    //             ) : (
    //               <Badge className="bg-orange-500">pending</Badge>
    //             )}
    //           </div>
    //         </CardHeader>
    //         <CardContent className="space-y-5">
    //           <div className="flex items-center">
    //             <p className="w-[8rem]">Email :</p>
    //             <p>{auth.user.email}</p>
    //           </div>
    //           {/* <div className="flex items-center">
    //             <p className="w-[8rem]">Mobile :</p>
    //             <p>+918987667899</p>
    //           </div> */}
    //           <div>
    //             <Dialog>
    //               <DialogTrigger>
    //                 <Button>Verify Account</Button>

    //               </DialogTrigger>
    //               <DialogContent className="">
    //                 <DialogHeader className="">
    //                   <DialogTitle className="px-10 pt-5 text-center">
    //                     verify your account
    //                   </DialogTitle>
    //                 </DialogHeader>
    //                 <AccountVarificationForm handleSubmit={handleVerifyOtp}/>
    //               </DialogContent>
    //             </Dialog>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </div>



    <div className="min-h-screen flex flex-col items-center py-10 px-5 sm:px-8 md:px-20 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <div className="w-full lg:w-[60%] space-y-8">
        {/* User Info Card */}
        <Card className="w-full shadow-md border border-gray-700 bg-gray-800">
          <CardHeader className="pb-6">
            <CardTitle className="text-lg text-gray-100">Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="flex items-center">
                <p className="w-[9rem] font-semibold text-gray-400">Full Name:</p>
                <p className="text-gray-300">{auth.user?.fullName}</p>
              </div>
              <div className="flex items-center">
                <p className="w-[9rem] font-semibold text-gray-400">Email:</p>
                <p className="text-gray-300">{auth.user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two-Step Verification */}
        <Card className="w-full shadow-md border border-gray-700 bg-gray-800">
          <div className="p-6 flex items-center gap-6">
            <CardTitle className="text-lg text-gray-100">Two-Step Verification</CardTitle>
            <Badge className={`py-1 px-3 text-sm font-semibold text-white ${auth.user.twoFactorAuth?.enabled ? "bg-green-600" : "bg-orange-500"
              }`}>
              {auth.user.twoFactorAuth?.enabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <CardContent>
            <Dialog>
              <DialogTrigger>
                <Button className="w-full py-2">Enable Two-Step Verification</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">Verify Your Account</DialogTitle>
                </DialogHeader>
                <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card className="w-full shadow-md border border-gray-700 bg-gray-800">
          <div className="p-6 flex items-center gap-6">
            <CardTitle className="text-lg text-gray-100">Account Status</CardTitle>
            <Badge className={`py-1 px-3 text-sm font-semibold text-white ${auth.user.verified ? "bg-green-600" : "bg-orange-500"
              }`}>
              {auth.user.verified ? "Verified" : "Pending"}
            </Badge>
          </div>
          <CardContent className="space-y-5">
            <div className="flex items-center">
              <p className="w-[8rem] font-semibold text-gray-400">Email:</p>
              <p className="text-gray-300">{auth.user.email}</p>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="w-full py-2">Verify Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">Verify Your Account</DialogTitle>
                </DialogHeader>
                <AccountVarificationForm handleSubmit={handleVerifyOtp} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
