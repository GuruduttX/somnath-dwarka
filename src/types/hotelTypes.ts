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

// An individual hotel property admins can add under a city page.
export interface IHotelProperty {
  id?: string;
  name: string;
  image?: string;
  tier?: string; // Budget / Mid-range / Premium
  area?: string;
  price_range?: string;
  rating?: number;
  reviews?: number;
  distance?: string;
  amenities?: string[];
  tags?: string[];
  description?: string;
}

export interface IHotel {
  slug: string;
  title: string;
  city: string;
  near_temple?: string;
  tiers?: IHotelTier[];
  properties?: IHotelProperty[];
  faq?: IFAQ[];
  status?: "draft" | "published";
}
