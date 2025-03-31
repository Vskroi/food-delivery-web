import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { SelectedCategories } from "@/components/food/SelectedCategories";

export const Food = () => {
    const { user } = useParams<{ user: string }>();
    const router = useRouter();
    const [catery, setCatery] = useState<Cat>({
      name: "",
      _id: "",
    });

    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [allFoods, setAllFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
  
    const category = async () => {
      try {
        setLoading(false);
        const response = await axios.get("http://localhost:4000/categories");
        setCategories(response.data.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getFoods = async (_id: string | null) => {
      try {
        setLoading(false);
        const AllDish = _id === "AllDish";
  
        if (AllDish) {
          const response = await axios.get("http://localhost:4000/food/allfoods");
          setAllFoods(response.data.data);
        } else {
          const response = await axios.get(
            `http://localhost:4000/food/category/${_id}`
          );
          if (response) {
            setAllFoods(response.data.data);
     
          } else {
            setAllFoods([]);
        
          }
        }
        setLoading(true);
      } catch (error) {
        console.log(error);
        setAllFoods([]);
     
      }
    };
  
    useEffect(() => {
      const selectedCategory = searchParams.get("cateryName");
   
      setCatery((prev) => ({ ...prev, _id: selectedCategory || "" }));
      const cateryName = categories.find((a) => a._id === selectedCategory);

      if (cateryName) {
        setCatery((prev) => ({ ...prev, name: cateryName.cateryName || "" }));
        getFoods(cateryName._id as string);
      } else {
        setCatery((prev) => ({ ...prev, name: "AllDish" }));
        getFoods("AllDish");
      }
    }, [searchParams]);
  
  
    useEffect(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("cateryName", "AllDish");
      router.push(`?${params.toString()}`);
      category();
      getFoods("AllDish");
    }, []);
    return (<>
        {catery.name === "AllDish" ? (
        categories.map((cat) => (
          <div
            key={`Alldish${cat._id}`}
            className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12"
          >
            <p>{cat.cateryName}</p>
            <div className="grid gap-8 grid-cols-4">
              {allFoods.filter((f) => f.category === cat._id).length > 0 ? (
                allFoods
                  .filter((f) => f.category === cat._id)
                  .map((food) => (
                    <div key={food._id}>
                      {" "}
                      <SelectedCategories food={food} />{" "}
                    </div>
                  ))
              ) : (
                <div>No food found</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12">
          <p>{catery.name}</p>
          <div className="grid gap-8 wrap grid-cols-4">
            {allFoods && allFoods.length > 0 ? (
              allFoods.map((food) => (
                <div key={food._id}>
                  {" "}
                  <SelectedCategories food={food} />
                </div>
              ))
            ) : (
              <div>no food found</div>
            )}
          </div>
        </div>
      )}</>)
}