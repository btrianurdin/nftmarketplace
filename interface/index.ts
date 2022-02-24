export interface INftAsset {
  name: string;
  description: string;
  image: string;
  id: string;
  background_color: string;
}

export interface ICollection {
  imageUrl: string;
  bannerUrl: string;
  volumeTrade: number;
  createdBy: any;
  description: string;
  title: string;
  floorPrice: number;
  allOwners: any;
  creator: string;
}