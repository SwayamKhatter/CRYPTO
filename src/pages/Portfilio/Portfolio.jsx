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
import TreadingHistory from "./TreadingHistory";
import { useNavigate } from "react-router-dom";

const tab = ["portfolio", "history"];
const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset } = useSelector((store) => store);
  // const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  console.log("currentTab-----", currentTab);
  return (
    // <div className="px-10 py-5 h-screen bg-gradient-to-t from-yellow-300 to-orange-400">
    //   <div className="pb-5 flex items-center gap-5">
    //     <Select
    //       onValueChange={handleTabChange}
    //       defaultValue="portfolio"
    //       className=""
    //     >
    //       <SelectTrigger className="w-[180px] py-[1.2rem] ">
    //         <SelectValue placeholder="Select Portfolio" />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectItem value="portfolio">Portfolio</SelectItem>
    //         <SelectItem value="history">History</SelectItem>
    //       </SelectContent>
    //     </Select>

    //     {/* {tab.map((item) => (
    //       <Button
    //       key={item}
    //         className="rounded-full"
    //         size="lg"
    //         onClick={() => setActiveTab(item)}
    //         variant={activeTab == item ? "secondary" : "outline"}
    //       >
    //         {item.toUpperCase()}
    //       </Button>
    //     ))} */}
    //   </div>
    //   {
    //     currentTab == "portfolio" ? (
    //       <Table className="px-5  relative">
    //         <TableHeader className="py-9">
    //           <TableRow className="sticky top-0 left-0 right-0 bg-background ">
    //             <TableHead className="py-3">Assets</TableHead>
    //             <TableHead>PRICE</TableHead>
    //             <TableHead>UNIT</TableHead>
    //             <TableHead>CHANGE</TableHead>
    //             <TableHead>CHANGE(%)</TableHead>
    //             <TableHead className="text-right">VALUE</TableHead>
    //           </TableRow>
    //         </TableHeader>

    //         <TableBody className="">
    //           {asset.userAssets?.map((item) => (
    //             <TableRow
    //               onClick={() => navigate(`/market/${item.coin.id}`)}
    //               key={item.id}
    //             >
    //               <TableCell className="font-medium flex items-center gap-2">
    //                 <Avatar className="-z-50">
    //                   <AvatarImage
    //                     src={item.coin.image}
    //                     alt={item.coin.symbol}
    //                   />
    //                 </Avatar>
    //                 <span> {item.coin.name}</span>
    //               </TableCell>
    //               <TableCell>{item.coin.current_price}</TableCell>
    //               <TableCell>{item.quantity}</TableCell>
    //               <TableCell
    //                 className={`${
    //                   item.coin.price_change_percentage_24h < 0
    //                     ? "text-red-600"
    //                     : "text-green-600"
    //                 }`}
    //               >
    //                 {item.coin.price_change_24h}
    //               </TableCell>
    //               <TableCell
    //                 className={`${
    //                   item.coin.price_change_percentage_24h < 0
    //                     ? "text-red-600"
    //                     : "text-green-600"
    //                 }`}
    //               >
    //                 {item.coin.price_change_percentage_24h}%
    //               </TableCell>

    //               <TableCell className="text-right">
    //                 {item.coin.current_price * item.quantity}
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     ) : (
    //       <TreadingHistory />
    //     )
    //     // <div className="flex items-center justify-center h-[70vh]">
    //     //   <h1 className="text-3xl font-semibold">No History Available</h1>
    //     //   </div>
    //   }
    // </div>


    <div className="px-6 md:px-10 py-5 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200">
      {/* Top Section */}
      <div className="pb-5 flex flex-wrap items-center gap-5">
        <Select onValueChange={handleTabChange} defaultValue="portfolio">
          <SelectTrigger className="w-full md:w-[200px] py-[1rem] bg-gray-700 text-white border border-gray-600">
            <SelectValue placeholder="Select Portfolio" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Section */}
      {currentTab === "portfolio" ? (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800">
          <Table className="w-full text-sm md:text-base">
            <TableHeader className="bg-gray-700 text-gray-300">
              <TableRow className="text-left">
                <TableHead className="py-3 px-4">Assets</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change (%)</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {asset.userAssets?.map((item) => (
                <TableRow
                  onClick={() => navigate(`/market/${item.coin.id}`)}
                  key={item.id}
                  className="hover:bg-gray-700 transition duration-200 cursor-pointer"
                >
                  <TableCell className="py-3 px-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={item.coin.image} alt={item.coin.symbol} />
                    </Avatar>
                    <span className="font-medium">{item.coin.name}</span>
                  </TableCell>
                  <TableCell>${item.coin.current_price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell
                    className={`${item.coin.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-400"
                      }`}
                  >
                    {item.coin.price_change_24h.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={`${item.coin.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-400"
                      }`}
                  >
                    {item.coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    ${(item.coin.current_price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <TreadingHistory />
      )}
    </div>
  );
};

export default Portfolio;
