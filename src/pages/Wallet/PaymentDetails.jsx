import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    // <div className="px-20 bg-gradient-to-t from-yellow-300 to-orange-400 h-screen ">
    //   <h1 className="text-3xl font-bold py-10">Payment Details</h1>
    //   {withdrawal.paymentDetails ? (
    //     <Card className="mb-10">
    //       <CardHeader>
    //         <CardTitle>
    //           {withdrawal.paymentDetails?.bankName.toUpperCase()}
    //         </CardTitle>
    //         <CardDescription>
    //           A/C No:{" "}
    //           {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="flex items-center">
    //           <p className="w-32">A/C Holder</p>
    //           <p className="text-gray-400">
    //             : {withdrawal.paymentDetails.accountHolderName}
    //           </p>
    //         </div>
    //         <div className="flex items-center">
    //           <p className="w-32">IFSC</p>
    //           <p className="text-gray-400">
    //             : {withdrawal.paymentDetails.ifsc.toUpperCase()}
    //           </p>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   ) : (
    //     <Dialog>
    //       <DialogTrigger>
    //         <Button className="py-6">Add Payment Details</Button>
    //       </DialogTrigger>
    //       <DialogContent>
    //         <DialogHeader className="pb-5">
    //           <DialogTitle>Payment Details</DialogTitle>
    //         </DialogHeader>
    //         <PaymentDetailsForm />
    //       </DialogContent>
    //     </Dialog>
    //   )}
    // </div>


    <div className="min-h-screen px-6 sm:px-10 md:px-20 py-10 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <h1 className="text-3xl font-bold pb-6 text-gray-100">Payment Details</h1>

      {withdrawal.paymentDetails ? (
        <Card className="mb-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-yellow-400">
              {withdrawal.paymentDetails?.bankName.toUpperCase()}
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              A/C No: {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <p className="w-32 text-gray-400">A/C Holder</p>
                <p className="text-gray-300">: {withdrawal.paymentDetails.accountHolderName}</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 text-gray-400">IFSC</p>
                <p className="text-gray-300">: {withdrawal.paymentDetails.ifsc.toUpperCase()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="w-full sm:w-auto px-6 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 transition">
              Add Payment Details
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border border-gray-700 text-gray-300 rounded-lg">
            <DialogHeader className="pb-5">
              <DialogTitle className="text-lg font-semibold text-gray-100">Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
