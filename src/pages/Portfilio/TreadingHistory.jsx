/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "../Home/AssetTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";

const TreadingHistory = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset, order } = useSelector((store) => store);
  // const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  console.log("currentTab-----", currentTab);
  return (
    // <div className="">
    //   <Table className="px-5  relative">
    //     <TableHeader className="py-9">
    //       <TableRow className="sticky top-0 left-0 right-0 bg-background ">
    //         <TableHead className="py-3">Date & Time</TableHead>
    //         <TableHead>Trading Pair</TableHead>
    //         <TableHead>Buy Price</TableHead>
    //         <TableHead>Selling Price</TableHead>
    //         <TableHead>Order Type</TableHead>
    //         <TableHead>Profit/Loss</TableHead>
    //         <TableHead className="text-right">VALUE</TableHead>
    //       </TableRow>
    //     </TableHeader>

    //     <TableBody className="">
    //       {order.orders?.map((item) => (
    //         <TableRow key={item.id}>
    //           <TableCell>
    //             <p>{readableDate(item.timestamp).date}</p>
    //             <p className="text-gray-400">
    //               {readableDate(item.timestamp).time}
    //             </p>
    //           </TableCell>
    //           <TableCell className="font-medium flex items-center gap-2">
    //             <Avatar className="-z-50">
    //               <AvatarImage
    //                 src={item.orderItem.coin.image}
    //                 alt={item.orderItem.coin.symbol}
    //               />
    //             </Avatar>
    //             <span> {item.orderItem.coin.name}</span>
    //           </TableCell>

    //           <TableCell>${item.orderItem.buyPrice}</TableCell>
    //           <TableCell>{"$" + item.orderItem.sellPrice || "-"}</TableCell>
    //           <TableCell>{item.orderType}</TableCell>
    //           <TableCell
    //             className={`${
    //               calculateProfite(item) < 0 ? "text-red-600" : ""
    //             }`}
    //           >
    //             {item.orderType == "SELL" ? calculateProfite(item) : "-"}
    //           </TableCell>
    //           <TableCell className="text-right">${item.price}</TableCell>
    //           {/*  */}
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </div>



    <>
      {/* Table Container with Responsive Scroll */}
      <div className="bg-gray-800 p-5 md:p-8 overflow-x-auto animate-fade-in">
        <Table className="w-full min-w-[800px]">
          <TableHeader>
            <TableRow className="bg-gray-700 text-gray-300">
              <TableHead className="py-4">Date & Time</TableHead>
              <TableHead>Trading Pair</TableHead>
              <TableHead>Buy Price</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead>Profit/Loss</TableHead>
              <TableHead className="text-right">VALUE</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.orders?.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-700 transition">
                {/* Date & Time */}
                <TableCell>
                  <p>{readableDate(item.timestamp).date}</p>
                  <p className="text-gray-400 text-sm">
                    {readableDate(item.timestamp).time}
                  </p>
                </TableCell>

                {/* Trading Pair */}
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="-z-50">
                    <AvatarImage
                      src={item.orderItem.coin.image}
                      alt={item.orderItem.coin.symbol}
                    />
                  </Avatar>
                  <span>{item.orderItem.coin.name}</span>
                </TableCell>

                {/* Buy & Sell Prices */}
                <TableCell className="text-green-400">${item.orderItem.buyPrice}</TableCell>
                <TableCell className="text-red-400">
                  {item.orderItem.sellPrice ? `$${item.orderItem.sellPrice}` : "-"}
                </TableCell>

                {/* Order Type */}
                <TableCell>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-md ${item.orderType === "BUY"
                        ? "bg-green-700 text-green-200"
                        : "bg-red-700 text-red-200"
                      }`}
                  >
                    {item.orderType}
                  </span>
                </TableCell>

                {/* Profit/Loss */}
                <TableCell
                  className={`font-medium ${calculateProfite(item) < 0 ? "text-red-500" : "text-green-400"
                    }`}
                >
                  {item.orderType === "SELL" ? calculateProfite(item) : "-"}
                </TableCell>

                {/* Order Value */}
                <TableCell className="text-right font-semibold text-gray-300">
                  ${item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TreadingHistory;
