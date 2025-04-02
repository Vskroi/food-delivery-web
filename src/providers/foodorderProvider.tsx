"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Define the foodOrderType for better type safety
type foodOrderType = {
  userId: string;
  totalPrice: number;
  image: string;
  food: string;
  quantity: number;
  status: "PENDING" | "COMPLETED" | "FAILED"; // Add more status types if needed
};

const FoodOrderContext = createContext<{
  foodOrder: foodOrderType;
  setFoodOrder: React.Dispatch<React.SetStateAction<foodOrderType>>;
  refetch: () => Promise<void>;
} | undefined>(undefined); // No need for array here, using an object

export const FoodOrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [foodOrder, setFoodOrder] = useState<foodOrderType>({
    userId: '',
    totalPrice: 0,
    image: '',
    food: '',
    quantity: 0,
    status: "PENDING",
  });

  useEffect(() => {
    // This ensures client-side logic only runs after the initial render
    if (typeof window !== "undefined") {
      // Perform any client-specific code here
      console.log("Client-side logic executed");
    }
  }, []);

  const fetchData = async () => {
    if (!foodOrder.userId || !foodOrder.food || !foodOrder.quantity) {
      alert("Please ensure all fields are filled!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/foodOrder/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: foodOrder.userId,
          totalPrice: foodOrder.totalPrice,
          image: foodOrder.image,
          food: foodOrder.food,
          quantity: foodOrder.quantity,
          status: "PENDING",
        }),
      });

  
     
    } catch (error) {
      console.error(error);
    
    }
  };

  return (
    <FoodOrderContext.Provider value={{ foodOrder, setFoodOrder, refetch: fetchData }}>
      {children}
    </FoodOrderContext.Provider>
  );
};

export const useFoodOrder = () => {
  const context = useContext(FoodOrderContext);
  if (!context) {
    throw new Error("useFoodOrder must be used within a FoodOrderProvider");
  }
  return context;
};
