"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import { PlusCircle } from "lucide-react";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { MouseEventHandler, SyntheticEvent } from "react";
//
// export const metadata: Metadata = {
//   title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
//   description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
// };

const TablesPage = () => {
  const handleAddUser: MouseEventHandler<HTMLButtonElement> = (
    e: SyntheticEvent,
  ) => {
    // Implement your add user logic here
    console.log("Add user clicked");
  };

  return (
    <DefaultLayout>
      {/*<div className="mb-6 flex items-center justify-between">*/}
      <Breadcrumb pageName="Users" />
      {/*</div>*/}
      <button
        onClick={handleAddUser}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
      >
        <PlusCircle className="h-5 w-5" />
        Add User
      </button>
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
