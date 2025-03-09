import { paymentHandler } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopupForm = () => {
  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );
    console.log(amount, paymentMethod);
  };
  return (
    // <div className="pt-10 space-y-5">
    //   <div>
    //     <h1 className="pb-1">Enter Amount</h1>
    //     <Input
    //       onChange={handleChange}
    //       value={amount}
    //       className="py-7 text-lg"
    //       placeholder="$9999"
    //     />
    //   </div>

    //   <div>
    //     <h1 className="pb-1">Select payment method</h1>
    //     <RadioGroup
    //       onValueChange={(value) => {
    //         setPaymentMethod(value);
    //       }}
    //       className="flex"
    //       defaultValue="RAZORPAY"
    //     >
    //       <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
    //         <RadioGroupItem
    //           icon={DotFilledIcon}
    //           iconClassName="h-8 w-8"
    //           className="h-9 w-9"
    //           value="RAZORPAY"
    //           id="r1"
    //         />
    //         <Label htmlFor="r1">
    //           <div className="bg-white rounded-md px-5 py-2 w-32">
    //             <img
    //               src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
    //               alt=""
    //             />
    //           </div>
    //         </Label>
    //       </div>
    //       <div className="flex items-center space-x-2 rounded-md border p-3 px-5">
    //         <RadioGroupItem
    //           icon={DotFilledIcon}
    //           className="h-9 w-9"
    //           iconClassName="h-8 w-8"
    //           value="STRIPE"
    //           id="r2"
    //         />
    //         <Label htmlFor="r2">
    //           <div className="bg-white rounded-md px-5 py- w-32">
    //             <img
    //               className="h-10"
    //               src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
    //               alt=""
    //             />
    //           </div>
    //         </Label>
    //       </div>
    //     </RadioGroup>
    //   </div>
    //   {wallet.loading ? (
    //     <Skeleton className="py-7 w-full" />
    //   ) : (
    //     <Button
    //       onClick={handleSubmit}
    //       variant=""
    //       className="w-full py-7 text-xl"
    //     >
    //       Submit
    //     </Button>
    //   )}
    // </div>



    <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
      {/* Amount Input */}
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-300 pb-2">Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-4 px-4 text-lg bg-gray-800 border border-gray-700 text-gray-200 rounded-md focus:ring-2 focus:ring-yellow-400 w-full"
          placeholder="₹9999"
        />
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-300 pb-2">Select Payment Method</h1>
        <RadioGroup
          onValueChange={(value) => setPaymentMethod(value)}
          className="space-y-4"
          defaultValue="RAZORPAY"
        >
          {/* Razorpay Option */}
          <div className="flex items-center gap-4 border border-gray-700 p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1" className="flex items-center w-full">
              <div className="bg-white rounded-md px-4 py-2 w-32 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
                  alt="Razorpay"
                  className="h-6"
                />
              </div>
            </Label>
          </div>

          {/* Stripe Option */}
          <div className="flex items-center gap-4 border border-gray-700 p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6"
              value="STRIPE"
              id="r2"
            />
            <Label htmlFor="r2" className="flex items-center w-full">
              <div className="bg-white rounded-md px-4 py-2 w-32 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt="Stripe"
                  className="h-6"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Submit Button */}
      {wallet.loading ? (
        <Skeleton className="py-4 w-full bg-gray-700 rounded-md" />
      ) : (
        <Button
          onClick={handleSubmit}
          className="w-full py-4 text-lg font-semibold bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition rounded-md"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default TopupForm;
