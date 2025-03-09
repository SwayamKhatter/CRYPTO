import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/Redux/Wallet/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CopyIcon,
  DownloadIcon,
  ReloadIcon,
  ShuffleIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { DollarSign, WalletIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopupForm from "./TopupForm";
import TransferForm from "./TransferForm";
import WithdrawForm from "./WithdrawForm";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((store) => store);
  const query = useQuery();
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const orderId = query.get("order_id");
  const { order_id } = useParams();

  useEffect(() => {
    if (orderId || order_id) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId: orderId || order_id,
          paymentId: razorpayPaymentId || "AuedkfeuUe",
          navigate,
        })
      );
      console.log(paymentId, orderId);
    }
  }, [paymentId, orderId, razorpayPaymentId]);

  useEffect(() => {
    handleFetchUserWallet();
    hanldeFetchWalletTransactions();
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const hanldeFetchWalletTransactions = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };

  function copyToClipboard(text) {
    // Create a new element
    const element = document.createElement("textarea");
    element.value = text;
    document.body.appendChild(element);

    // Select the text content
    element.select();

    // Try copying the selection using Async Clipboard API
    try {
      const copied = navigator.clipboard.writeText(text);
      copied.then(
        () => {
          console.log("Text copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy text: ", err);
        }
      );
    } catch (err) {
      console.error(
        "Failed to copy text (fallback to deprecated execCommand): ",
        err
      );
    }

    // Cleanup
    document.body.removeChild(element);
  }

  console.log("order _ id", order_id);
  if (wallet.loading) {
    return <SpinnerBackdrop />
  }

  return (
    // <div className="flex flex-col items-center bg-gradient-to-t from-yellow-300 to-orange-400 h-screen">
    //   <div className="pt-10 w-full lg:w-[60%]">
    //     <Card className="p-10 shadow-slate-600 shadow-md">
    //       <CardHeader className="pb-9 ">
    //         <div className="flex justify-between items-center">
    //           <div className="flex items-center gap-5 ">
    //             <WalletIcon className="h-8 w-8" />
    //             <div>
    //               <CardTitle className="text-2xl">My Wallet</CardTitle>
    //               <div className="flex items-center gap-2">
    //                 <p className="text-gray-400 text-sm">
    //                   #FAVHJY{wallet.userWallet?.id}
    //                 </p>

    //                 <CopyIcon
    //                   onClick={() => copyToClipboard(wallet.userWallet?.id)}
    //                   className="cursor-pointer hover:text-slate-400"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <ReloadIcon
    //               onClick={handleFetchUserWallet}
    //               className="w-6 h-6 cursor-pointer hover:text-gray-400"
    //             />
    //           </div>
    //         </div>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="flex items-center ">
    //           {/* <DollarSign /> */}
    //           <div className="text-2xl text-black font-semibold">Rs. </div>

    //           <span className="text-2xl font-semibold">
    //             {wallet.userWallet?.balance}
    //           </span>
    //         </div>

    //         <div className="flex gap-7 mt-5">
    //           <Dialog className="">
    //             <DialogTrigger>
    //               <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
    //                 <UploadIcon />
    //                 <span className="text-sm mt-2 ">Add Money</span>
    //               </div>
    //             </DialogTrigger>
    //             <DialogContent className="p-10">
    //               <DialogHeader>
    //                 <DialogTitle className="text-center text-2xl">
    //                   Top Up Your Wallet
    //                 </DialogTitle>
    //                 <TopupForm />
    //               </DialogHeader>
    //             </DialogContent>
    //           </Dialog>

    //           <Dialog>
    //             <DialogTrigger>
    //               <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
    //                 <DownloadIcon />
    //                 <span className="text-sm mt-2">Withdraw</span>
    //               </div>
    //             </DialogTrigger>
    //             <DialogContent className="p-10">
    //               <DialogHeader>
    //                 <DialogTitle className="text-center text-xl">
    //                   Request Withdrawal
    //                 </DialogTitle>
    //                 <WithdrawForm />
    //               </DialogHeader>
    //             </DialogContent>
    //           </Dialog>

    //           {/* <Dialog>
    //             <DialogTrigger>
    //               <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
    //                 <ShuffleIcon />
    //                 <span className="text-sm mt-2">Transer</span>
    //               </div>
    //             </DialogTrigger>
    //             <DialogContent className="p-10">
    //               <DialogHeader>
    //                 <DialogTitle className="text-center text-xl">
    //                   Transfer To Other Wallet
    //                 </DialogTitle>
    //                 <TransferForm />
    //               </DialogHeader>
    //             </DialogContent>
    //           </Dialog> */}
    //         </div>
    //       </CardContent>
    //     </Card>
    //     <div className="py-5 pt-10">
    //       <div className="flex gap-2 items-center pb-5">
    //         <h1 className="text-2xl font-semibold">History</h1>
    //         <UpdateIcon
    //           onClick={hanldeFetchWalletTransactions}
    //           className="p-0 h-7 w-7 cursor-pointer hover:text-gray-400"
    //         />
    //       </div>

    //       {/* <Separator /> */}
    //       <div className="space-y-5">
    //         {wallet.transactions?.map((item, index) => (
    //           <div key={index}>
    //             <Card className="lg:w-[50] px-5 py-2 flex justify-between items-center">
    //               <div className="flex items-center gap-5">
    //                 <Avatar>
    //                   <AvatarFallback>
    //                     <ShuffleIcon />
    //                   </AvatarFallback>
    //                 </Avatar>
    //                 <div className="space-y-1">
    //                   <h1>{item.type || item.purpose}</h1>
    //                   <p className="text-sm text-gray-500">{item.date}</p>
    //                 </div>
    //               </div>
    //               <div>
    //                 <p className="flex items-center">
    //                   {/* <DollarSign className="h-4 w-4" /> */}
    //                   <span className={`${item.amount>0?"text-green-500":"text-red-500"}`}>₹ {item.amount}</span>
    //                 </p>
    //               </div>
    //             </Card>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    // </div>



    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 px-4 md:px-10 lg:px-20 py-10 flex flex-col items-center">
      {/* Wallet Section */}
      <div className="w-full max-w-2xl">
        <Card className="p-8 shadow-lg border border-gray-700 bg-gray-800 rounded-lg">
          <CardHeader className="pb-6 flex justify-start items-center">
            {/* Wallet Title & ID */}
            <div className="flex items-center gap-4">
              <WalletIcon className="h-8 w-8 text-yellow-400" />
              <div>
                <CardTitle className="text-3xl font-semibold text-gray-200">My Wallet</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <p>#FAVHJY{wallet.userWallet?.id}</p>
                  <CopyIcon
                    onClick={() => copyToClipboard(wallet.userWallet?.id)}
                    className="cursor-pointer hover:text-yellow-300 transition"
                  />
                </div>
              </div>
            </div>
            {/* Refresh Wallet */}
            <ReloadIcon
              onClick={handleFetchUserWallet}
              className="w-6 h-6 cursor-pointer hover:text-yellow-300 transition"
            />
          </CardHeader>

          <CardContent>
            {/* Wallet Balance */}
            <div className="flex items-center text-3xl font-semibold text-gray-100">
              <span className="text-yellow-400">₹</span> {wallet.userWallet?.balance}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 mt-6 justify-center">
              {/* Add Money Button */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:bg-yellow-500/20 cursor-pointer flex flex-col items-center justify-center rounded-lg shadow-md border border-gray-700 transition">
                    <UploadIcon className="text-yellow-400" />
                    <span className="text-sm mt-2 text-gray-300">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="p-6 bg-gray-900 border border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl text-gray-100">
                      Top Up Your Wallet
                    </DialogTitle>
                    <TopupForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* Withdraw Button */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:bg-red-500/20 cursor-pointer flex flex-col items-center justify-center rounded-lg shadow-md border border-gray-700 transition">
                    <DownloadIcon className="text-red-400" />
                    <span className="text-sm mt-2 text-gray-300">Withdraw</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="p-6 bg-gray-900 border border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl text-gray-100">
                      Request Withdrawal
                    </DialogTitle>
                    <WithdrawForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="py-8">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-semibold">Transaction History</h1>
            <UpdateIcon
              onClick={hanldeFetchWalletTransactions}
              className="h-7 w-7 cursor-pointer hover:text-yellow-300 transition"
            />
          </div>

          {/* Transaction List */}
          <div className="space-y-5">
            {wallet.transactions?.map((item, index) => (
              <Card key={index} className="p-4 bg-gray-800 border border-gray-700 rounded-lg flex justify-between items-center">
                {/* Transaction Type & Date */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-gray-700">
                      <ShuffleIcon className="text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-gray-100">{item.type || item.purpose}</h1>
                    <p className="text-sm text-gray-400">{item.date}</p>
                  </div>
                </div>

                {/* Amount */}
                <p className={`text-lg font-semibold ${item.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                  ₹ {item.amount}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
