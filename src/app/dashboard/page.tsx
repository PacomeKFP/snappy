"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useAuth } from "@/hooks/auth";

export default function Home() {

  const { organization, token } = useAuth({ middleware: 'auth' });
  if (!organization || !token) {
    return <p>Loading...</p>;
  }
 return (
   <DefaultLayout organization={organization}>
     <ECommerce />
   </DefaultLayout>
 );
}