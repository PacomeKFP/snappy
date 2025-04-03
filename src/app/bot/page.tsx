"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/bot/TableThree";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TablesHeader from "@/components/Header/TablesHeader";
import ChatBotsHeader from "@/components/Header/ChatbotManagement";
import { useState, useEffect, useCallback,useMemo } from "react";
import { useAuth } from "@/hooks/auth";
import { useManageBot } from "@/hooks/manageBot";

interface Bot {
  id: string;
  [key: string]: any;
}

const TablesPage = () => {
  const { organization, token } = useAuth({ middleware: "auth" });
  const organizationToken = useMemo(() => token || '', [token]);
  const { getAllBots } = useManageBot({ organizationToken });
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const projectId = useMemo(() => organization?.projectId, [organization]);

  const fetchBots = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      if (organization) {
        const fetchedBots = await getAllBots(projectId);
        setBots(fetchedBots);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [projectId, getAllBots]);

  useEffect(() => {
    if(projectId){
      fetchBots();
    }
  }, [projectId,fetchBots]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bots" />
      <ChatBotsHeader />
      <div className="flex flex-col gap-10 mt-6">
        <TableThree bots={bots} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
