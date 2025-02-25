import { Dispatch, SetStateAction } from "react";

// Import types
import { regions } from "@/app/api/regions/route";
export type regionType = (typeof regions)[number];

// Category types
export interface CategoryOption {
  id: string;
  label: string;
}
export type categoryId = CategoryOption["id"];
export interface CategorySelectorProps {
  options: CategoryOption[];
  defaultSelected: string;
  paramName: string;
  onChange: (selectedId: categoryId) => void;
  setCategory: Dispatch<SetStateAction<string>>;
}

// Listing types
export interface Listing {
  name: string;
  category: string;
  type: string;
  address: string;
  region: string;
  hourlyRate: number;
  amenities: string[];
}
export interface ListingsProps {
  data: Listing[];
}
export interface FetchListingsResponse {
  success: boolean;
  data: Listing[];
  error?: string;
}
export interface FetchRegionsResponse {
  success: boolean;
  data: string[];
  error?: string;
}

// Search types
export interface PropertyTypeOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}
export type typeId = PropertyTypeOption["id"];
export interface SearchContainerProps {
  regions: string[];
  defaultSelected: string;
  propertyTypes: PropertyTypeOption[];
  onChange: (selectedId: typeId) => void;
  setType: Dispatch<SetStateAction<string>>;
}

//Miscallenous type
interface Country {
  name: string;
  code: string;
  capital?: string;
  region: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
}
