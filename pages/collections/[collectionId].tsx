import { useWeb3 } from "@3rdweb/hooks"
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuctionListing, DirectListing, ListingMetadata, NFTMetadata, ThirdwebSDK } from '@3rdweb/sdk';
import Client from "../../lib/sanityClient";
import Header from "../../components/Header";
import { ICollection, INftAsset } from "../../interface";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import CardNFT from "../../components/CardNFT";

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2 cursor-pointer`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

export default function Collection() {
  const { provider } = useWeb3();
  const [collection, setCollection] = useState<ICollection>();
  const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>();
  const [nftAssets, setNftAssets] = useState<NFTMetadata[] | INftAsset[]>([]);
  const router = useRouter();
  const { collectionId } = router.query;

  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(provider?.getSigner());
    return sdk.getNFTModule(collectionId as string);
  }, [provider]);

  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();

      setNftAssets(nfts);
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

  const fetchCollection = useCallback(async () => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}"] {
      "imageUrl": profileImage.asset->url,
      "bannerUrl": bannerImage.asset->url,
      volumeTrade,
      createdBy,
      description,
      title,
      floorPrice,
      "allOwners": owners[]->,
      "creator": createdBy->userName,
    }`;

    const dataCollection = await Client.fetch(query);
    setCollection(dataCollection[0]);
  }, [collectionId]);

  useEffect(() => {
    fetchCollection();
  }, [collectionId]);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img src={collection?.bannerUrl || ''} className={style.bannerImage} alt="Banner" />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img src={collection?.imageUrl || ''} className={style.profileImg} alt="Profile" />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created By {' '}
            <span className="text-blue-600 cursor-pointer">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nftAssets.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{collection?.allOwners?.length || '0'}</div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img 
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" 
                  alt="eth"
                  className={style.ethLogo} 
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img 
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" 
                  alt="eth"
                  className={style.ethLogo} 
                />
                {collection?.volumeTrade}K
              </div>
              <div className={style.statName}>volume trade</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
        <div className="flex flex-wrap">
          {nftAssets.map((item, id) => (
            <CardNFT
              key={id}
              nftItem={item as INftAsset}
              title={collection?.title || ''}
              listings={listings}
            />
          ))}
        </div>
      </div>
    </div>
  )
}