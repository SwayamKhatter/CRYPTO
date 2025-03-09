import { getWithdrawalHistory } from "@/Redux/Withdrawal/Action";
import { readableDate } from "@/Util/readableDate";
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Withdrawal = () => {
  const dispatch = useDispatch();

  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);

  return (
    // <div className="px-20 bg-gradient-to-t from-yellow-300 to-orange-400 h-screen">
    //   <h1 className="text-3xl font-bold py-10">Withdrawal</h1>
    //   <div>
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="py-5">Date</TableHead>
    //           <TableHead>Method</TableHead>
    //           <TableHead>Amount</TableHead>
    //           <TableHead className="text-right">Status</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {withdrawal.history.map((item) => (
    //           <TableRow key={item.id}>
    //             <TableCell className="font-medium py-5">
    //               {readableTimestamp(item?.date)}
    //             </TableCell>
    //             <TableCell>{"Bank Account"}</TableCell>
    //             <TableCell>₹{item.amount}</TableCell>
    //             <TableCell className="text-right">
    //               <Badge className={`text-white ${item.status=="PENDING"?"bg-red-500 ":"bg-green-500" }
    //                `}>
    //                 {item.status}
    //               </Badge>

    //               </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </div>



    <div className="min-h-screen px-4 sm:px-8 md:px-20 py-10 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <h1 className="text-3xl font-bold pb-6 text-gray-100">Withdrawal History</h1>

      <div className="overflow-x-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <Table className="w-full">
          {/* Table Header */}
          <TableHeader className="bg-gray-700 text-gray-300">
            <TableRow>
              <TableHead className="py-5 px-4 sm:px-6">Date</TableHead>
              <TableHead className="px-4 sm:px-6">Method</TableHead>
              <TableHead className="px-4 sm:px-6">Amount</TableHead>
              <TableHead className="px-4 sm:px-6 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {withdrawal.history.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-700 transition">
                <TableCell className="font-medium py-5 px-4 sm:px-6">
                  {readableTimestamp(item?.date)}
                </TableCell>
                <TableCell className="px-4 sm:px-6">Bank Account</TableCell>
                <TableCell className="px-4 sm:px-6">₹{item.amount}</TableCell>
                <TableCell className="px-4 sm:px-6 text-right">
                  <Badge
                    className={`py-1 px-3 rounded-full text-sm font-semibold text-white ${item.status === "PENDING" ? "bg-red-500" : "bg-green-500"
                      }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Withdrawal;
