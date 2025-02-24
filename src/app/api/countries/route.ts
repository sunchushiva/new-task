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

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const query = searchParams.get("search")?.toLowerCase();

    let countriesList = Object.entries(countries).map(([code, data]) => ({
      name: data.name,
      code,
      capital: data.capital,
      region: continentMap[data.continent] || data.continent,
      currency: data.currency,
      phone: data.phone,
      languages: data.languages,
    }));

    // If search query exists, filter countries
    if (query) {
      countriesList = countriesList.filter(
        (country) =>
          country.name.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      data: countriesList,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch countries",
      },
      { status: 500 }
    );
  }
}
