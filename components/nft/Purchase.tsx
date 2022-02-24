import { AuctionListing, DirectListing, MarketplaceModule, NFTMetadata } from "@3rdweb/sdk";
import { useEffect, useState } from "react";
import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import { toast } from "react-toastify";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

interface PurchaseProps {
  isListed: any;
  selectedNft: NFTMetadata;
  listings: (AuctionListing | DirectListing)[];
  marketPlaceModule: MarketplaceModule | null;
}

export default function Purchase({
  isListed,
  selectedNft,
  listings,
  marketPlaceModule,
}: PurchaseProps) {
  const [selectedMarketNft, setSelectedMarketNft] = useState<(AuctionListing | DirectListing)>();
  const [enableButton, setEnableButton] = useState(false);

  useEffect(() => {
    if (!listings || isListed === 'false') return;
    (async () => {
      const listing = listings.find(market => market.asset.id === selectedNft.id);
      setSelectedMarketNft(listing);
    })();
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return;
    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);
  
  const buyItem = async (
    listingId: string | undefined,
    quantityDesired: number,
  ) => {
    if (!listingId) return;

    await marketPlaceModule?.buyoutDirectListing({ listingId, quantityDesired });
    toast.success('Purchase successful!');
  }

  return (
    <div className="bg-gray-700 h-20 w-full flex items-center px-12 rounded">
      {
        isListed === 'true' ? (
          <>
            <button
              onClick={() => {
                enableButton ? buyItem(selectedMarketNft?.id, 1) : null
              }}  
              className={`${style.button} bg-blue-600 hover:bg-blue-500`}
            >
              <IoMdWallet className={style.buttonIcon} />
              <div className={style.buttonText}>Buy Now</div>
            </button>
            <div className={`${style.button} border border-[#151c22] bg-gray-600`}>
              <HiTag className={style.buttonIcon} />
              <div className={style.buttonText}>Make Offer</div>
            </div>
          </>
        ) : (
          <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>List Item</div>
          </div>
        )
      }
    </div>
  )
}