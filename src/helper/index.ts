import {
  Listing,
  FetchRegionsResponse,
  FetchListingsResponse,
} from "@/utils/index";

export const fetchRegions = async (): Promise<FetchRegionsResponse> => {
  try {
    const response = await fetch("/api/regions");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: FetchRegionsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const fetchListings = async (
  category: string
): Promise<FetchListingsResponse> => {
  try {
    const response = await fetch(`/api/listings/${category}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: FetchListingsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const filterListings = (
  listings: Listing[],
  // region?: string,
  type: string
): Listing[] => {
  let result = listings.filter((listing) => listing.type === type);

  if (type === "any") {
    return listings;
  }

  return result;
};
