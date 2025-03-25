type Login = {
  email: string;
  password: string;
};
type event = { target: { value: string } };
type Category = {
  _id: string | null;
  cateryName: string | null;
};

type Food = {
  _id: string | null;
  foodName: string | null;
  price: number | null;
  ingerdiets: string | null;
  image: string | null;
  category: string | null;
};


type Dish = {
  foodName: string | null;
  price: string | null;
  ingerdiets: string | null;
  image: string | null;
  category: string | undefined;
};

type Cat = {
  name?: string;
  _id: string | null;
};
