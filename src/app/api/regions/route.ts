import { NextResponse } from "next/server";
import { countries } from "countries-list";

const continentMap: { [key: string]: string } = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};

const region = [
  ...new Set(
    Object.values(countries).map(
      (country) => continentMap[country.continent] || country.continent
    )
  ),
].sort();

export async function GET() {
  try {
    // Getting unique regions from countries

    return NextResponse.json({
      success: true,
      data: region,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch regions",
      },
      { status: 500 }
    );
  }
}

export const regions = [...region] as const;
