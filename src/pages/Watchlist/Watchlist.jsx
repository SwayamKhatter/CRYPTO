import { useEffect, useState } from "react";

import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

const Watchlist = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { watchlist, coin } = useSelector((store) => store);
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUserWatchlist());
  }, [page]);

  const handleAddToWatchlist = (id) => {
    if (!token) {
      alert("You must be logged in to add items to the watchlist.");
      return;
    }
    dispatch(addItemToWatchlist(id, token)); // Pass token here
  };
  return (
    // <div className="pt-8 lg:px-10 bg-gradient-to-t from-yellow-300 to-orange-400 h-screen">
    //     <div className="flex items-center pt-5 pb-10 gap-5">
    //         <BookmarkFilledIcon className="h-10 w-10"/>
    //     <h1 className=" text-4xl font-semibold">Watchlist</h1> 
    //     </div>

    //   <Table className="px-5 lg:px-20  border-t relative border-x border-b p-10 ">
    //     <ScrollArea className={""}>
    //       <TableHeader>
    //         <TableRow className="sticky top-0 left-0 right-0 bg-background">
    //           <TableHead className="py-4">Coin</TableHead>
    //           <TableHead>SYMBOL</TableHead>
    //           <TableHead>VOLUME</TableHead>
    //           <TableHead>MARKET CAP</TableHead>
    //           <TableHead>24H</TableHead>
    //           <TableHead className="">PRICE</TableHead>
    //           <TableHead className="text-right text-red-700">Remove</TableHead>
    //         </TableRow>
    //       </TableHeader>

    //       <TableBody className="">
    //         {watchlist.items.map((item) => (
    //           <TableRow className="" key={item.id}>
    //             <TableCell
    //               onClick={() => navigate(`/market/${item.id}`)}
    //               className="font-medium flex items-center gap-2 cursor-pointer"
    //             >
    //               <Avatar className="-z-50">
    //                 <AvatarImage src={item.image} alt={item.symbol} />
    //               </Avatar>
    //               <span> {item.name}</span>
    //             </TableCell>
    //             <TableCell>{item.symbol.toUpperCase()}</TableCell>
    //             <TableCell>{item.total_volume}</TableCell>
    //             <TableCell>{item.market_cap}</TableCell>
    //             <TableCell
    //               className={`${
    //                 item.market_cap_change_percentage_24h < 0
    //                   ? "text-red-600"
    //                   : "text-green-600"
    //               }`}
    //             >
    //               {item.market_cap_change_percentage_24h}%
    //             </TableCell>
    //             <TableCell>{item.current_price}</TableCell>

    //             <TableCell className="text-right">
    //               <Button onClick={()=>handleAddToWatchlist(item.id)} className="h-10 w-10" variant="outline" size="icon">
    //                 <BookmarkFilledIcon className="h-6 w-6" />
    //               </Button>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </ScrollArea>
    //   </Table>
    // </div>


    <div className="pt-8 px-4 lg:px-10 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200">
      {/* Header Section */}
      <div className="flex items-center pt-5 pb-6 gap-4">
        <BookmarkFilledIcon className="h-10 w-10 text-yellow-400" />
        <h1 className="text-3xl md:text-4xl font-semibold">Watchlist</h1>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <Table className="w-full">
          <TableHeader className="bg-gray-700 text-gray-300 sticky top-0 z-10">
            <TableRow>
              <TableHead className="py-3 px-4">Coin</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>24H Change</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right text-red-400">Remove</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {watchlist.items.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-700 transition duration-200"
              >
                <TableCell
                  onClick={() => navigate(`/market/${item.id}`)}
                  className="py-3 px-4 flex items-center gap-3 cursor-pointer"
                >
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.symbol} />
                  </Avatar>
                  <span className="font-medium">{item.name}</span>
                </TableCell>
                <TableCell>{item.symbol.toUpperCase()}</TableCell>
                <TableCell>{item.total_volume.toLocaleString()}</TableCell>
                <TableCell>{item.market_cap.toLocaleString()}</TableCell>
                <TableCell
                  className={`${item.market_cap_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-400"
                    }`}
                >
                  {item.market_cap_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell>${item.current_price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleAddToWatchlist(item.id)}
                    className="h-10 w-10 bg-gray-700 border-gray-600 hover:bg-red-600 transition duration-200"
                    variant="outline"
                    size="icon"
                  >
                    <BookmarkFilledIcon className="h-6 w-6 text-red-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Watchlist;

