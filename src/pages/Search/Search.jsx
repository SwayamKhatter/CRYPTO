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
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { searchCoin } from "@/Redux/Coin/Action";
import { useNavigate } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const SearchCoin = () => {
  const dispatch = useDispatch();
  const { asset, order, coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("keyword");
  const navigate = useNavigate()

  const handleSearchCoin = () => {
    dispatch(searchCoin(keyword));
  };

  if (coin.loading) {
    return <SpinnerBackdrop />
  }

  return (
    // <div className="p-10 lg:p=[50%]">
    //   <div className="flex items-center justify-center pb-16">
    //     <Input
    //       className="p-5 w-[90%] lg:w-[50%] rounded-r-none"
    //       placeholder="explore market..."
    //       onChange={(e) => setKeyword(e.target.value)}
    //     />
    //     <Button onClick={handleSearchCoin} className="p-5 rounded-l-none">
    //       <SearchIcon />
    //     </Button>
    //   </div>
    //   <Table className="px-5  relative">
    //     <TableHeader className="py-9">
    //       <TableRow className="sticky top-0 left-0 right-0 bg-background ">
    //         <TableHead className="py-3">Market Cap Rank</TableHead>
    //         <TableHead>Treading Pair</TableHead>

    //         <TableHead className="text-right">SYMBOL</TableHead>
    //       </TableRow>
    //     </TableHeader>

    //     <TableBody className="">
    //       {coin.searchCoinList?.map((item) => (
    //         <TableRow onClick={()=>navigate(`/market/${item.id}`)} key={item.id}>
    //           <TableCell>

    //             <p className="">
    //               {item.market_cap_rank}
    //             </p>
    //           </TableCell>
    //           <TableCell className="font-medium flex items-center gap-2">
    //             <Avatar className="-z-50">
    //               <AvatarImage
    //                 src={item.large}
    //                 alt={""}
    //               />
    //             </Avatar>
    //             <span> {item.name}</span>
    //           </TableCell>

    //           <TableCell className="text-right">${item.symbol}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </div>



    <div className="min-h-screen flex flex-col items-center px-5 sm:px-10 lg:px-20 py-10 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      {/* Search Bar */}
      <div className="w-full flex flex-col items-center pb-10">
        <div className="flex w-full sm:w-[80%] lg:w-[50%] border border-gray-600 rounded-lg overflow-hidden shadow-md">
          <Input
            className="p-4 mr-4 w-full text-gray-300 bg-gray-800 focus:outline-none"
            placeholder="Explore market..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            onClick={handleSearchCoin}
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 transition"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <Table className="w-full border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <TableHeader className="sticky top-0 bg-gray-800 text-gray-200">
            <TableRow>
              <TableHead className="py-4 px-3">Market Cap Rank</TableHead>
              <TableHead className="px-3">Trading Pair</TableHead>
              <TableHead className="px-3 text-right">Symbol</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {coin.searchCoinList?.map((item) => (
              <TableRow
                onClick={() => navigate(`/market/${item.id}`)}
                key={item.id}
                className="cursor-pointer hover:bg-gray-700 transition"
              >
                <TableCell className="py-3 px-3">{item.market_cap_rank}</TableCell>
                <TableCell className="px-3 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.large} alt={item.name} />
                  </Avatar>
                  <span className="font-medium">{item.name}</span>
                </TableCell>
                <TableCell className="px-3 text-right uppercase">${item.symbol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SearchCoin;
