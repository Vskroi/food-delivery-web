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


export const SheetComponent = () => {
  const userData = useUserData();
  const [orderData, setOrderData] = useState<Order[] >([]);
  const [foodArray, setFoodArray] = useState<Food[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [items , setItems] = useState<number>()
console.log("orderData" , orderData)


  const getData = async () => {
    try {
      const response = await axios.get<Order[]>(
        `http://localhost:4000/FoodOrder/userID/${userData?.data._id}`
      );
     if(response.data){
      setOrderData(response.data);
     }

      const foods = response.data.flatMap((order) =>
        order.foodOrderItems.map((item) => item.food)
      );
      setFoodArray(foods);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError("Failed to fetch order data.");
    }
  };

  useEffect(() => {
    if (userData?.data?._id && !isDataFetched) {
      getData();
      setIsDataFetched(true);
     
    }
    if (orderData && orderData.length > 0) {
      const items = orderData.map((order, index) => order.totalPrice + orderData[index].totalPrice);
      console.log("items" , items)
     
    }
    
  }, [userData, isDataFetched]);

  const handleOpenSheet = () => {
    if (!isDataFetched) {
      getData();
      setIsDataFetched(true);
    }
  };

  return (
    <Sheet>
      <SheetTrigger onClick={handleOpenSheet}>
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
                      className="flex border-b-[1px] w-[330px] border-black mr-3 border-dashed pb-[20px] justify-between items-center "
                    >
                      <div className="flex gap-2 mt-5">
                        <img
                          src={foodItem.image as string}
                          alt={`Image of ${foodItem.foodName}`}
                          className="rounded-xl h-[120px] w-[120px]"
                        />
                        <div>
                          <p className="mb-[10px] text-red-500 text-[18px]">
                            {foodItem.foodName}
                          </p>
                          <p className="mb-[10px] text-black">
                            {foodItem.ingerdiets}
                          </p>
                          <p className="mb-[10px] text-black">
                            ${foodItem.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No food items available.</p>
                )}
              </div>
              <button className="w-[439px] mt-[40px] h-[44px] border-[1.5px] text-red-500 text-[18px] rounded-full border-red-500 flex justify-center items-center">
                Add food
              </button>
            </div>
            <div className="w-[471px] h-[276px] bg-white rounded-xl mt-10 p-5">
              <h3 className="text-black text-2xl">Payment Info</h3>
              <div className="flex w-full justify-between text-Inter">
                <p>Items</p>
                <p>{} </p>
              </div>
              <div className="flex w-full justify-between text-Inter mt-3">
              
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      {error && <p className="text-red-500">{error}</p>}
    </Sheet>
  );
};
