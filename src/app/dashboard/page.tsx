// "use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
// import { useAuth } from "@/hooks/auth";


export default function Home() {

  
 return (
   <DefaultLayout>
     <ECommerce />
   </DefaultLayout>
 );
}