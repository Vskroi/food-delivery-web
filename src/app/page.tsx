"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    router.push("/login")
  })
  return (
    <>
      {" "}
      
    </>
  );
}
//
//1. Food Delivery Service => Sign-up:
//    1. Validate email and password
//    2. Check if email already exist => true => return error
//    3. Bcrypt user password
//    4. Create user
// 2. Food Delivery Service => Login:
//    1. Validate email and password
//    2. Check if email already exist => false => return account not found
//    3. Compare password with user password
//    4. Return user
// 3. Food Delivery Client => Login & Sign up pages
// 4. Food Delivery Admin => Admin Food Menu
//    1. CRUD Category
//    2. CRUD FOOD
// 5. Food Delivery Admin => Admin Settings
//    1. Get all users
// 6. Food Delivery Client => Client Home Page
// 7. Food Delivery Service => Client order CRUD
// 8. Food Delivery Client =>Client Card + Location
// 9. Food Delivery Client =>Client order
//10. Food Delivery Admin => Admin Order Table
//
