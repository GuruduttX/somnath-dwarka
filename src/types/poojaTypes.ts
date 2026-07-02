export interface BenefitType {
  id: string;
  description: string;
}

export interface IPoojaForm {
  slug: string;
  title: string;
  temple?: string;
  benefits: BenefitType[];
  price_from?: number;
  duration?: string;
  status?: "draft" | "published";
}
