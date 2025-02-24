import { ListingsProps } from "@/utils/index";
import React from "react";

export default function Listings({ data }: ListingsProps) {
  return (
    <div className="w-[90%] m-auto">
      <h2 className="text-2xl font-bold mb-4">Available Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((listing, index) => (
          <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
            <h3 className="text-xl font-semibold">{listing.name}</h3>
            <p className="text-gray-600">{listing.address}</p>
            <p className="text-gray-800 font-bold">
              ${listing.hourlyRate} / hour
            </p>
            <p className="text-gray-500">Category: {listing.category}</p>
            <p className="text-gray-500">Region: {listing.region}</p>
            <p className="text-gray-500">Type: {listing.type}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Amenities:</h4>
              <ul className="list-disc list-inside">
                {listing.amenities.map((amenity, index) => (
                  <li key={index} className="text-gray-500">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
