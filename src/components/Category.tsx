import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categoryId, CategorySelectorProps } from "@/utils/index";

export default function Category({
  options,
  defaultSelected,
  paramName,
  onChange,
  setCategory,
}: CategorySelectorProps) {
  // Getting the value of category from the URL
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Declaring states
  const [activeTab, setActiveTab] = useState<categoryId>(defaultSelected);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    options.forEach((option) => {
      if (!tabRefs.current[option.id]) {
        tabRefs.current[option.id] = null;
      }
    });
  }, [options]);

  const clickHandler = (id: string) => {
    setActiveTab(id);
    onChange(id);
    setCategory(id as categoryId);

    params.set(paramName, id as categoryId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="inline-flex relative bg-[#130532] rounded-t-lg w-full md:w-3/5">
      {options.map((option, index) => (
        <button
          key={option.id}
          ref={(el) => {
            tabRefs.current[option.id] = el;
          }}
          onClick={() => clickHandler(option.id)}
          className={`
            p-4 w-full md:w-2/5 text-base transition-colors duration-200 cursor-pointer
            hover:text-base tracking-wider
            ${
              activeTab === option.id
                ? "text-[#DAB1DA] font-semibold bg-[#130532]"
                : "text-black font-normal bg-white"
            }
          ${index == 0 ? "rounded-tl-lg bg-[#130532]" : ""}
          ${index === options.length - 1 ? "rounded-tr-lg" : ""}
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
