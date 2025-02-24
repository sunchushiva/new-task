import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaUserFriends,
  FaCalendar,
  FaWallet,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { regionType, typeId, SearchContainerProps } from "@/utils/index";

export const SearchContainer = ({
  regions,
  defaultSelected,
  propertyTypes,
  onChange,
  setType,
}: SearchContainerProps) => {
  // Checking for the value for the type from the URL
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const urlPropertyType = searchParams.get("type");
  const initialPropertyType = propertyTypes.some(
    (p) => p.id === urlPropertyType
  )
    ? urlPropertyType
    : defaultSelected;

  // Declaring states
  const [search, setSearch] = useState<typeId>(defaultSelected);
  const [guest, setGuest] = useState(1);
  const [location, setLocation] = useState<regionType>("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (
      !urlPropertyType ||
      !propertyTypes.some((p) => p.id === urlPropertyType)
    ) {
      // Checking if the type is valid or not
      params.set("type", initialPropertyType as typeId);
    }
    router.push(`?${params.toString()}`, { scroll: false });
    setType(initialPropertyType as typeId);
    setSearch(initialPropertyType as typeId);
  }, []);

  const updateSearchParams = (type: typeId) => {
    setSearch(type);
    onChange(type);
    setType(type as typeId);

    const params = new URLSearchParams(searchParams.toString());
    params.set("type", type);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-b-xl pt-6">
      {/* Property Types */}
      <div className="w-full flex flex-wrap gap-4 mb-6 mx-auto pb-4 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        {propertyTypes.map((type) => {
          return (
            <label
              key={type.id}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              <input
                type="radio"
                name="propertyType"
                value={type.id}
                checked={search === type.id}
                onChange={() => updateSearchParams(type.id)}
                className="m-0"
              />
              <span className="text-lg">{type.icon}</span>
              <span className="hover:text-indigo-600">{type.label}</span>
            </label>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="w-[90%] px-4 flex flex-col md:flex-row gap-4 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)] pb-4">
        {/* Location Field */}
        <div className="flex-1 relative border border-gray-200 rounded-lg">
          <FaMapMarkerAlt className="absolute left-4 top-[50%] -translate-y-1/2 text-gray-700 text-lg pointer-events-none" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value as regionType)}
            className="w-full h-full pl-12 pr-4 py-3 outline-none text-[0.9rem] bg-transparent cursor-pointer text-black appearance-none"
          >
            <option value="" disabled>
              Select Region
            </option>
            {regions?.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Guests Counter */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg">
          <FaUserFriends className="text-gray-700 text-lg" />
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setGuest(guest - 1)}
              disabled={guest <= 1}
              className="px-4 py-0 border border-gray-200 rounded text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="text-[0.9rem] text-black">
              {guest} Guest{guest > 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setGuest(guest + 1)}
              disabled={guest >= 4}
              className="px-4 py-0 border border-gray-200 rounded text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg">
          <FaCalendar className="text-gray-700 text-lg" />
          <DatePicker
            selectsRange
            startDate={checkIn}
            endDate={checkOut}
            onChange={(dates) => {
              const [start, end] = dates;
              setCheckIn(start);
              setCheckOut(end);
            }}
            placeholderText="Check In & Out"
            dateFormat="MMM d, yyyy"
            className="w-full border-none outline-none text-[0.9rem] text-black"
          />
        </div>

        {/* Price Range */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg">
          <FaWallet className="text-gray-700 text-lg" />
          <div className="flex items-center gap-2 w-full">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              min={minPrice}
              max={100000}
              className="w-20 px-2 py-1 border border-gray-200 rounded text-black outline-none text-[0.9rem]"
            />
            <span className="text-black">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              min={minPrice}
              max={100000}
              className="w-20 px-2 py-1 border border-gray-200 rounded text-black outline-none text-[0.9rem]"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex-0 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          <button className="h-full px-4 py-3 ">
            <FaSearch className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};
