import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserData } from "@/providers/AuthenticationProvider";
import axios from "axios";
import { LucideShoppingCart } from "lucide-react";

type Order = {
  _id: string;
  foodOrderItems: {
    food: Food;
    quantity: number;
  }[];
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  user: string;
  image: string;
};

export const SheetComponent = () => {
  const userData = useUserData();
  const [orderData, setOrderData] = useState<Order[] | undefined>(undefined);
  const [foodArray, setFoodArray] = useState<Food[]>([]);
  console.log("foodArray", foodArray);
  const getData = async () => {
    try {
      const response = await axios.get<Order[]>(
        `http://localhost:4000/FoodOrder/userID/${userData?.data._id}`
      );
      setOrderData(response.data);

      const foods = response.data.flatMap((order) =>
        order.foodOrderItems.map((item) => item.food)
      );
      setFoodArray(foods);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    if (userData?.data?._id) {
      getData();
    }
  }, [userData]);

  return (
    <Sheet>
      <SheetTrigger onClick={getData}>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <LucideShoppingCart />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-white">
            <LucideShoppingCart stroke="white" /> Order detail
          </SheetTitle>
          <SheetDescription>
            <div className="bg-white fit-content h-8 p-[2px] rounded-full flex items-center">
              <div className="w-1/2 h-full bg-red-500 rounded-full text-white flex justify-center items-center">
                Cart
              </div>
              <div className="w-1/2 h-full bg-red-500 rounded-full text-white flex justify-center items-center">
                Order
              </div>
            </div>
            <div className="w-[471px] h-[540px] p-4 bg-white mt-[30px] rounded-xl">
              <h4 className="text-black text-[20px]">My cart</h4>
              <div className="block gap-[20px]">
                {foodArray.length > 0 ? (
                  foodArray.map((foodItem, index) => (
                    <div
                      key={index}
                      className="flex mb-[20px] justify-between items-center"
                    >
                      <div className="flex gap-2">
                        <img
                          src={foodItem.image as string}
                          alt=""
                          className="rounded-xl h-[100px] w-[100px]"
                        />
                        <div >
                          <p className="mb-[10px] text-red-500 text-[18px]">{foodItem.foodName}</p>
                        <p className="mb-[10px] text-black">{foodItem.ingerdiets}</p>
                          <p className="mb-[10px] text-black">${foodItem.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No food items available.</p>
                )}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
