import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";

import "./WithdrawForm.css";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalRequest } from "@/Redux/Withdrawal/Action";
import { DialogClose } from "@/components/ui/dialog";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { useNavigate } from "react-router-dom";

const WithdrawForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const { wallet, withdrawal } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.toString().length < 6) {
      setAmount(e.target.value);
    }
  };

  const handleSubmit = () => {
    dispatch(withdrawalRequest({ jwt: localStorage.getItem("jwt"), amount }));
  };

  if (!withdrawal.paymentDetails) {
    return (
      <div className="h-[20rem] flex gap-5 flex-col justify-center items-center">
        <p className="text-2xl font-bold">Add payment method</p>
        <Button onClick={() => navigate("/payment-details")}>
          Add Payment Details
        </Button>
      </div>
    );
  }

  return (
    // <div className="pt-10 space-y-5">
    //   <div className="flex justify-between items-center rounded-md bg-slate-900 text- text-xl font-bold px-5 py-4">
    //     <p>Available balance</p>
    //     <p>${wallet.userWallet?.balance}</p>
    //   </div>
    //   <div className="flex flex-col items-center">
    //     <h1 className="">Enter withdrawal amount</h1>

    //     <div className="flex items-center justify-center ">
    //       <Input
    //         onChange={handleChange}
    //         value={amount}
    //         className="withdrawInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center "
    //         placeholder="$9999"
    //         type="number"
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <p className="pb-2">Transfer to</p>
    //     <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
    //       <img
    //         className="h-8 w-8"
    //         src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
    //         alt=""
    //       />
    //       <div>
    //         <p className="text-xl font-bold">
    //           {withdrawal.paymentDetails?.bankName}
    //         </p>
    //         <p className="text-xs">
    //           {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <DialogClose className="w-full">
    //     <Button
    //       onClick={handleSubmit}
    //       variant=""
    //       className="w-full py-7 text-xl"
    //     >
    //       Withdraw {amount && <span className="ml-5">${amount}</span>}
    //     </Button>
    //   </DialogClose>
    // </div>



    <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
      {/* Available Balance */}
      <div className="flex justify-between items-center rounded-md bg-gray-800 text-gray-300 text-lg font-semibold px-5 py-4 border border-gray-700">
        <p>Available Balance</p>
        <p>${wallet.userWallet?.balance}</p>
      </div>

      {/* Withdrawal Amount Input */}
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-gray-300 text-lg font-medium pb-2">Enter Withdrawal Amount</h1>
        <div className="w-full">
          <Input
            onChange={handleChange}
            value={amount}
            type="number"
            className="w-full py-4 text-center text-2xl bg-gray-800 border border-gray-700 text-gray-200 rounded-md focus:ring-2 focus:ring-yellow-400"
            placeholder="$9999"
          />
        </div>
      </div>

      {/* Transfer To Section */}
      <div className="mt-6">
        <p className="text-gray-300 pb-2">Transfer To</p>
        <div className="flex items-center gap-4 border border-gray-700 p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
          <img
            className="h-8 w-8"
            src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
            alt="Bank"
          />
          <div>
            <p className="text-lg font-semibold text-gray-200">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs text-gray-400">
              {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </p>
          </div>
        </div>
      </div>

      {/* Withdraw Button */}
      <DialogClose className="w-full mt-6">
        <Button
          onClick={handleSubmit}
          className="w-full py-4 text-lg font-semibold bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition rounded-md"
        >
          Withdraw {amount && <span className="ml-3">${amount}</span>}
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawForm;
