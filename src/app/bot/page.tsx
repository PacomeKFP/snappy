"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/bot/TableThree";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TablesHeader from "@/components/Header/TablesHeader";
import ChatBotsHeader from "@/components/Header/ChatbotManagement";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/auth";
import { manageBot } from "@/hooks/manageBot";

const TablesPage = () => {
  const { organization, token } = useAuth({ middleware: "auth" });
  const { getAllBots } = manageBot({ organizationToken: token || "" });
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBots = useCallback(async () => {
    try {
      if (organization) {
        const bots = await getAllBots(organization.projectId);
        setBots(bots);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [organization, getAllBots]);

  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

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
