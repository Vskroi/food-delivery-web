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
type foodOrderType = {
  userId: string ;
  totalPrice: number ;
  image: string ;
  food: string ;
  quantity: number ;
  status?: string ;
};
type CreateAccount = {
  email?: string | null;
  password?: string;
};
type UserContextType = {
  data: {
    email: string;
    _id: string;
    role: string;
  };
  exp: number;
  iat: number;
};

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

type FoodOrder = {
  createdAt: string;
  foodOrderItems: {
    food: {
      foodName: string;
      price: number;
      _id: string;
    };
    quantity: string;
    _id: string;
  }[];
  user: {
    email: string;
    phoneNumber: string;
    _id: string;
  };
  image: string;
  totalPrice: number;
  updatedAt: string;
  _id: string;
  status: string; // Add the status field to the FoodOrder type
};
