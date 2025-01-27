import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import {DeveloppersPage} from "@/components/pages/Developpers/DeveloppersPage";
//import { SettingsPage } from "@/components/pages/settings/SettingsPage";
// import { SettingsPage } from "@/app/settings/Settings";

export const metadata: Metadata = {
  title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const Developpers = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Developpers" />

        <DeveloppersPage />
      </div>
    </DefaultLayout>
  );
};

export default Developpers;
