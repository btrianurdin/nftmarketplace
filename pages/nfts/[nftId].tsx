import { useWeb3 } from "@3rdweb/hooks";
import { AuctionListing, DirectListing, NFTMetadata, ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from "../../components/nft/ItemActivity";
import NftImage from "../../components/nft/NftImage";
import Purchase from "../../components/nft/Purchase";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

export default function Nfts() {
  const [selectedNft, setSelectedNft] = useState<NFTMetadata>();
  const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>([]);
  const { provider } = useWeb3();
  const router = useRouter();

  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(provider?.getSigner());
    return sdk.getNFTModule('0x50CFF79C0402f057B565C6739acf0beAdE5CA256');
  }, [provider]);

  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();

      const selectedNftArray = nfts.filter((nft) => nft.id === router.query.nftId);
      console.log(selectedNftArray)
      setSelectedNft(selectedNftArray[0]);
    })();
  }, [nftModule]);

  const marketplaceModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(provider?.getSigner());
    return sdk.getMarketplaceModule('0x5dD723875d65CB3DE6D92Aa1269a2054814951ef');
  }, [provider]);

  useEffect(() => {
    if (!marketplaceModule) return;
    (async () => {
      const listingData = await marketplaceModule.getAllListings();
      setListings(listingData);
    })();
  }, [marketplaceModule]);

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              {
                selectedNft && <NftImage selectedNft={selectedNft} />
              }
            </div>
            <div className={style.detailsContainer}>
              {
                selectedNft && (
                  <>
                    <GeneralDetails selectedNft={selectedNft} />
                    <Purchase
                      isListed={router.query.isListed}
                      selectedNft={selectedNft}
                      listings={listings}
                      marketPlaceModule={marketplaceModule || null}
                    />
                  </>
                )
              }
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
}