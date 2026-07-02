export interface IFAQ {
  id?: string;
  question: string;
  answer: string;
}

export interface IHotelTier {
  id?: string;
  tier: string;
  area?: string;
  typical_range?: string;
  typical_range_verified?: boolean;
}

export interface IHotel {
  slug: string;
  title: string;
  city: string;
  near_temple?: string;
  tiers?: IHotelTier[];
  faq?: IFAQ[];
  status?: "draft" | "published";
}
