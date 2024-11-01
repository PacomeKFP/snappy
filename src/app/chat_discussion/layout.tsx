'use client'
// import type { metadata } from "next";
import "@/app/globals.css";




export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div>
        {children}
  </div>  

  );
}
