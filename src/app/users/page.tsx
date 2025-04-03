"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TablesHeader from "@/components/Header/TablesHeader"
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/hooks/auth";
import { useManageUser } from "@/hooks/manageUser";

interface User {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  online: boolean;
  avatar: string;
  createdAt: string;
}

const TablesPage = () => {
  const { organization, token } = useAuth({ middleware: 'auth' });
  const organizationToken = useMemo(() => token || '', [token]);
  const { getAllUsers } = useManageUser({ organizationToken });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const projectId = useMemo(() => organization?.projectId, [organization]);

  const fetchUsers = useCallback(async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      const fetchedUsers = await getAllUsers(projectId);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId, getAllUsers]);
  
  useEffect(() => {
    if (projectId) {
      fetchUsers();
    }
  }, [projectId, fetchUsers]);

  if (loading && users.length === 0) {
    return <DefaultLayout><div className="flex items-center justify-center h-screen">Loading...</div></DefaultLayout>;
  }
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <TablesHeader />
      <div className="flex flex-col gap-10 mt-6">
        <TableThree users={users} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;