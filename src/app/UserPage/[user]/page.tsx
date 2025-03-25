"use client";

import { DishesCategory } from "@/components/food/category";
import { Food } from "@/components/food/foods";
import { Header } from "@/components/food/header";

export default function Home() {
  return (
    <>
      <Header />
      <img className="w-full" src="../BG.png" alt="" />
      <DishesCategory />
      <Food />
    </>
  );
}
