/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotIcon,
} from "@radix-ui/react-icons";
import StockChart from "./StockChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "@/Redux/Coin/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { existInWatchlist } from "@/Util/existInWatchlist";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import axios from "axios";
import { API_BASE_URL } from "@/Api/api";
import PredictPriceModal from "./PredictPriceModal";


const StockDetails = () => {

  const [predictModalOpen, setPredictModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coin, watchlist, auth } = useSelector((store) => store);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const token = useSelector((state) => state.auth?.token) || localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: auth.jwt || localStorage.getItem("jwt"),
      })
    );
  }, [id]);

  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);

  const handleAddToWatchlist = () => {
    if (!token) {
      alert("You must be logged in to add items to the watchlist.");
      return;
    }

    dispatch(addItemToWatchlist(coin.coinDetails?.id, token)); // Pass token here
  };

  const handlePredictPrice = (days) => {
    setShowDropdown(false);
    setSelectedDate(days);
    setPredicting(true);
    setPredictionData(null);

    axios
      .get(`${API_BASE_URL}/coins/${coin.coinDetails?.name.toLowerCase()}/predict`, {
        params: {
          days,
        },
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((response) => {
        console.log("Prediction response:", response.data);
        setPredictionData(response.data.predicted_price);
        setPredicting(false);
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
        setPredicting(false);
      });
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    // <>
    //   {coin.loading ? (
    //     <SpinnerBackdrop />
    //   ) : (
    //     <div className="px-6 py-10 bg-gradient-to-t from-yellow-300 to-orange-400 min-h-screen">
    //       {/* Top Section: Coin Info + Actions */}
    //       <div className="flex justify-between items-center flex-wrap gap-4">
    //         {/* Coin Info */}
    //         <div className="flex items-center gap-6">
    //           <Avatar className="w-16 h-16">
    //             <AvatarImage src={coin.coinDetails?.image?.large} />
    //           </Avatar>
    //           <div className="space-y-1">
    //             <div className="flex items-center gap-2 text-lg font-semibold">
    //               <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
    //               <DotIcon className="text-gray-500" />
    //               <p className="text-gray-600">{coin.coinDetails?.name}</p>
    //             </div>
    //             <div className="flex items-end gap-3 text-xl font-bold">
    //               <p>${coin.coinDetails?.market_data.current_price.usd}</p>
    //               <p
    //                 className={`text-sm font-medium ${coin.coinDetails?.market_data.market_cap_change_24h < 0
    //                     ? "text-red-600"
    //                     : "text-green-600"
    //                   }`}
    //               >
    //                 <span>
    //                   {coin.coinDetails?.market_data.market_cap_change_24h.toFixed(2)}
    //                 </span>
    //                 <span className="ml-1">
    //                   ({coin.coinDetails?.market_data.market_cap_change_percentage_24h.toFixed(2)}%)
    //                 </span>
    //               </p>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Action Buttons */}
    //         <div className="flex items-center gap-4">
    //           {/* Predict Price */}
    //           <Button
    //             className="h-10 w-44"
    //             variant="outline"
    //             onClick={() => setPredictModalOpen(true)}
    //           >
    //             Predict Price
    //           </Button>

    //           {/* Watchlist Button */}
    //           <Button
    //             onClick={handleAddToWatchlist}
    //             className="h-10 w-10 flex items-center justify-center p-0"
    //             variant="outline"
    //           >
    //             {existInWatchlist(watchlist.items, coin.coinDetails) ? (
    //               <BookmarkFilledIcon className="h-6 w-6" />
    //             ) : (
    //               <BookmarkIcon className="h-6 w-6" />
    //             )}
    //           </Button>


    //           {/* Trade Button */}
    //           <Dialog>
    //             <DialogTrigger asChild>
    //               <Button size="lg" className="h-10">TRADE</Button>
    //             </DialogTrigger>
    //             <DialogContent>
    //               <DialogHeader>
    //                 <DialogTitle className="px-10 pt-5 text-center">
    //                   How much do you want to spend?
    //                 </DialogTitle>
    //               </DialogHeader>
    //               <TreadingForm />
    //             </DialogContent>
    //           </Dialog>
    //         </div>
    //       </div>

    //       {/* Divider Line */}
    //       <div className="w-full h-px bg-gray-300 my-6" />

    //       {/* Stock Chart Section */}
    //       <div className="mt-6">
    //         <StockChart coinId={coin.coinDetails?.id} />
    //       </div>
    //     </div>
    //   )}

    //   {/* Predict Price Modal */}
    //   <PredictPriceModal
    //     coinName={coin.coinDetails?.id}
    //     open={predictModalOpen}
    //     onClose={() => setPredictModalOpen(false)}
    //   />
    // </>


    <>
      {coin.loading ? (
        <SpinnerBackdrop />
      ) : (
        <div className="px-4 py-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
          {/* Top Section: Coin Info + Actions */}
          <div className="flex flex-wrap justify-between items-center gap-6">
            {/* Coin Info */}
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14">
                <AvatarImage src={coin.coinDetails?.image?.large} />
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <p className="uppercase">{coin.coinDetails?.symbol}</p>
                  <DotIcon className="text-gray-500" />
                  <p className="text-gray-400">{coin.coinDetails?.name}</p>
                </div>
                <div className="flex items-end gap-3 text-2xl font-bold">
                  <p>${coin.coinDetails?.market_data.current_price.usd}</p>
                  <p
                    className={`text-sm font-medium ${coin.coinDetails?.market_data.market_cap_change_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                      }`}
                  >
                    <span>
                      {coin.coinDetails?.market_data.market_cap_change_24h.toFixed(2)}
                    </span>
                    <span className="ml-1">
                      ({coin.coinDetails?.market_data.market_cap_change_percentage_24h.toFixed(2)}%)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Predict Price Button */}
              <Button
                className="h-10 px-6 border border-gray-500 hover:bg-gray-700 transition-all text-black"
                variant="outline"
                onClick={() => setPredictModalOpen(true)}
              >
                Predict Price
              </Button>

              {/* Watchlist Button */}
              <Button
                onClick={handleAddToWatchlist}
                className="h-10 w-10 flex items-center justify-center p-0 border border-gray-500 hover:bg-gray-700 transition-all"
                variant="outline"
              >
                {existInWatchlist(watchlist.items, coin.coinDetails) ? (
                  <BookmarkFilledIcon className="h-6 w-6 text-black" />
                ) : (
                  <BookmarkIcon className="h-6 w-6 text-black" />
                )}
              </Button>

              {/* Trade Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="h-10 px-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all"
                  >
                    TRADE
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border border-gray-600 text-white">
                  <DialogHeader>
                    <DialogTitle className="px-6 pt-4 text-center text-lg">
                      How much do you want to spend?
                    </DialogTitle>
                  </DialogHeader>
                  <TreadingForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-600 my-6" />

          {/* Stock Chart Section */}
          <div className="mt-6">
            <StockChart coinId={coin.coinDetails?.id} />
          </div>
        </div>
      )}

      {/* Predict Price Modal */}
      <PredictPriceModal
        coinName={coin.coinDetails?.id}
        open={predictModalOpen}
        onClose={() => setPredictModalOpen(false)}
      />
    </>
  );

};

export default StockDetails;



