"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TablesHeader from "@/components/Header/TablesHeader"
import { useState } from "react";

const TablesPage = () => {
  const [users, setUsers] = useState([]);

  const handleAddUser = () => {
    
    console.log("Add user clicked");

  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <TablesHeader onAddUser={handleAddUser} />
      <div className="flex flex-col gap-10 mt-6">
        <TableThree users={users} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;