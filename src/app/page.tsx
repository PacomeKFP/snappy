"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import axiosInstance from "@/lib/axios";
import React, { useEffect } from "react";

export default function Home() {
 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axiosInstance.get("http://localhost:8001/");
       console.log("Données récupérées :", response.data); // Utilisez .data avec Axios
     } catch (error) {
       console.error("Erreur de requête :", error);
     }
   };

   fetchData();
 }, []); 

 return (
   <DefaultLayout>
     <ECommerce />
   </DefaultLayout>
 );
}