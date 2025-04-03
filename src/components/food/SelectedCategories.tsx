import { Minus, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useUserData } from "@/providers/AuthenticationProvider";
import { useFoodOrder } from "@/providers/foodorderProvider";

type Props = {
  food: Food;
  foodDetail: () => void;  // Corrected from `doodDetail`
};

export const SelectedCategories: React.FC<Props> = ({ food, foodDetail }) => {
  const { foodOrder, setFoodOrder, refetch } = useFoodOrder();
  const userData = useUserData();
  const [number, setNumber] = useState<number>(1);
 

  const selectMinus = () => {
    if (number === 1) return;
    setNumber(number - 1);
  };


  const selectPlus = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    if (userData as UserContextType) {
      setFoodOrder((prev: any) => ({
        ...prev,
        food: food._id as string,
        image: food.image as string,
        userId: userData?.data._id,
      }));
    }
  }, [userData, food]);

  useEffect(() => {
    setFoodOrder((prev) => ({
      ...prev,
      totalPrice: (food.price as number) * number,
      quantity: number,
    }));
  }, [number, food, setFoodOrder]);

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      setNumber(newQuantity);
    }
  };

  return (
    <div className="w-[270.75px] h-[241px] rounded-[22px] border-[1px] bg-white border-[#E4E4E7] p-4">
      <div
        className="relative w-[238.75px] h-[129px] rounded-xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${food.image as string})` }}
      >
        <img
          className="w-full h-full object-cover opacity-0"
          src={food.image as string}
          alt={food.foodName as string}
        />

        <AlertDialog>
          <AlertDialogTrigger>
            <div className="absolute bottom-2 right-2 flex justify-center items-center w-[36px] h-[36px] bg-[#ef4444] rounded-full">
              <Plus stroke="white" />
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent className="w-full">
            <AlertDialogHeader className="grid grid-cols-2 w-full">
              <img
                className="w-[200px] h-[200px]"
                src={food.image as string}
                alt={food.foodName as string}
              />

              <div className="w-full">
                <AlertDialogTitle className="text-xl font-semibold text-red-500">
                  {food.foodName}
                </AlertDialogTitle>
                <p className="text-gray-600">{food.ingerdiets}</p>
                <div className="w-full flex justify-between mt-20">
                  <div>
                    <p className="text-gray-600 text-[15px]">Total price</p>
                    <p>
                      $
                      <span className="text-xss font-bold">
                        {foodOrder.totalPrice}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label htmlFor="Quantity" className="sr-only">
                      Quantity
                    </label>

                    <div className="flex">
                      <button
                        type="button"
                        className={`flex justify-center items-center w-[36px] h-[36px] border-[1px] bg-white rounded-full
                          ${
                            number === 1
                              ? "border-grey-300 cursor-not-allowed"
                              : "border-black"
                          }`}
                        onClick={selectMinus}
                        disabled={number === 1}
                      >
                        <Minus stroke={number === 1 ? "gray" : "black"} />
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        onChange={onNumberChange}
                        value={number}
                        className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm dark:bg-gray-900 dark:text-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />

                      <button
                        type="button"
                        className={`flex justify-center items-center w-[36px] h-[36px] border-black border-[1px] bg-white rounded-full`}
                        onClick={selectPlus}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  foodDetail()
                  
                }}
              >
                Add to cart
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
      </div>

      <div className="self-stretch inline-flex flex-col w-full justify-start items-start gap-2">
        <div className="self-stretch w-full inline-flex justify-center items-center justify-between">
          <h1 className="flex-1 justify-start text-red-500 text-[20px]">
            {food.foodName}
          </h1>
          <div className="justify-start  leading-none">
            $<span className="text-xss font-bold">{food.price}</span>
          </div>
        </div>
        <div className="self-stretch justify-start text-text-text-foreground text-xs font-normal leading-none">
          {food.ingerdiets}
        </div>
      </div>
      
    </div>
  );
};
