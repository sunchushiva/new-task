"use client";

import Category from "@/components/Category";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { SearchContainer } from "@/components/SearchContainer";
import { fetchRegions, fetchListings, filterListings } from "@/helper";
import { Listing, categoryId, typeId } from "@/utils/index";
import Listings from "@/components/Listings";
import { FaHotel, FaHome, FaHouseUser, FaClock, FaUsers } from "react-icons/fa";

const categories = [
  { id: "shared-stays", label: "Shared stays" },
  { id: "share-time", label: "Share time" },
  { id: "shared-spaces", label: "Shared spaces" },
];

const propertyTypes = [
  { id: "any", label: "Any Type", icon: <FaHome /> },
  { id: "hotel", label: "Hotel", icon: <FaHotel /> },
  { id: "hostel", label: "Hostel", icon: <FaHouseUser /> },
  { id: "guest-house", label: "Guest House", icon: <FaHome /> },
  { id: "hourly-room", label: "Hourly Room", icon: <FaClock /> },
  { id: "roommates", label: "Roommates", icon: <FaUsers /> },
];

const defaultCategory = categories[0].id;
const defaultType = propertyTypes[0].id;

export default function Home() {
  const [regions, setRegions] = useState<string[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [category, setCategory] = useState<categoryId>(defaultCategory);
  const [reservedListings, setReservedListings] = useState<Listing[]>([]);
  const [type, setType] = useState<typeId>(defaultType);

  useEffect(() => {
    fetchRegions().then((res) => {
      setRegions(res.data);
    });

    fetchListings(category).then((res) => {
      setListings(res.data);
      setReservedListings(res.data);

      const filteredData = filterListings(res.data, type);
      setListings(filteredData);
    });
  }, [category, type]);

  const categoryClickHandler = (category: categoryId) => {
    fetchListings(category).then((res) => {
      setListings(res.data);
      setReservedListings(res.data);
    });
  };

  const typeClickHandler = (type: typeId) => {
    const filteredData = filterListings(reservedListings, type);
    setListings(filteredData);
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-8 rounded-b-2xl">
        {/* Header component  */}
        <Header />

        {/* Category component  */}
        <Category
          options={categories}
          defaultSelected={category}
          onChange={categoryClickHandler}
          setCategory={setCategory}
        />

        {/* Search Container which includes region, date range, guests, expenditure  */}
        <SearchContainer
          regions={regions}
          defaultSelected={type}
          onChange={typeClickHandler}
          propertyTypes={propertyTypes}
          setType={setType}
        />
      </div>

      {/* Listing component to show all the data  */}
      <Listings data={listings} />
    </div>
  );
}
