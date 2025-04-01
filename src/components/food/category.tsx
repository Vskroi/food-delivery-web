"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const DishesCategory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined | null
  >("AllDishes");

  const category = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      const data = response.data.data;
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setSelected = (menu: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (menu === "AllDishes") {
      setSelectedCategory("AllDishes");
    } else {
      const selecetedCategory = categories.find((name) => name._id === menu);
      setSelectedCategory(selecetedCategory?.cateryName);
    }

    params.set("cateryName", menu);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    category();
  }, []);

  return (
    <>
      <div className="p-6 bg-white rounded-xl flex  gap-4 relative left-12 mt-12 flex">
        <div className=" justify-start items-center gap-3 flex-wrap content-center overflow-hidden flex">
          <div
            className={`h-9 px-4 py-2 cursor-pointer bg-background-bg-background rounded-full border-[1px] flex justify-start items-center gap-2
        ${
          selectedCategory === "AllDishes" ? "border-red-600" : "border-black"
        }`}
            onClick={() => setSelected("AllDishes")}
          >
            <p className="cursor-pointer">All Dishes</p>
          </div>
        </div>
        {categories.map((category) => (
          <div
            key={category._id}
            className="inline-flex justify-start cursor-pointer items-center gap-3 flex-wrap content-center overflow-hidden"
          >
            <div
              className={`h-9 px-4 py-2 cursor-pointer bg-background-bg-background rounded-full border-[1px] flex justify-start items-center gap-2
        ${
          selectedCategory === category.cateryName!
            ? "border-red-600"
            : "border-black"
        }`}
              onClick={() => setSelected(category._id!)}
            >
              <p className="cursor-pointer">{category.cateryName}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
