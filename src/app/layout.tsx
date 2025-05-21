import type { Metadata } from "next";

import "./globals.css";
import { Itim } from "next/font/google";
import { Sidebar } from "lucide-react";
import SidebarLeft from "@/components/SidebarLeft";

export const metadata: Metadata = {
	title: "Alan Chat",
	description: "Alan Chat Application",
	icons: {
		icon: "/pic5.jpg", // Nous utiliserons notre propre favicon
	},
};

const itim = Itim({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-itim",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr" className="h-full">
			<body className={`${itim.variable} antialiased h-full overflow-hidden bg-white`}>
				<div className="h-full flex relative">
					<SidebarLeft />
					<main className="h-full flex-1">{children}</main>
				</div>
			</body>
		</html>
	);
}
