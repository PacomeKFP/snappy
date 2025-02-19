"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TablesHeader from "@/components/Header/TablesHeader"
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/auth";
import { useManageUser } from "@/hooks/manageUser";


const TablesPage = () => {
  const { organization, token } = useAuth({ middleware: 'auth' });
  const { getAllUsers } = useManageUser({ organizationToken: token || '' });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);




  const fetchUsers = useCallback(async () => {
    try {
      if (organization) {
        const users = await getAllUsers(organization.projectId);
        setUsers(users);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [organization, getAllUsers]);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (loading) {
    return <p>Loading...</p>;
    
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <TablesHeader  />
      <div className="flex flex-col gap-10 mt-6">
        <TableThree users={users}  />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;