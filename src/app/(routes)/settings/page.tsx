"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Settings {
	notifications: boolean;
	soundEnabled: boolean;
	darkMode: boolean;
	language: "fr" | "en";
	status: "active" | "away" | "busy" | "invisible";
}

export default function SettingsPage() {
	const router = useRouter();
	const [settings, setSettings] = useState<Settings>({
		notifications: true,
		soundEnabled: true,
		darkMode: false,
		language: "fr",
		status: "active",
	});

	const [showDeactivateModal, setShowDeactivateModal] = useState(false);

	const handleSettingChange = (setting: keyof Settings, value: any) => {
		setSettings((prev) => ({ ...prev, [setting]: value }));
	};

	const handleLogout = () => {
		// Add logout logic here
		router.push("/");
	};

	const handleDeactivateAccount = () => {
		// Add account deactivation logic here
		setShowDeactivateModal(false);
		router.push("/");
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-8 text-gray-900">
				Paramètres
			</h1>

			{/* General Settings */}
			<div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-purple-100">
				<h2 className="text-xl font-semibold mb-4 text-gray-900">
					Paramètres généraux
				</h2>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-gray-900">Notifications</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={settings.notifications}
								onChange={(e) =>
									handleSettingChange(
										"notifications",
										e.target.checked
									)
								}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-purple-100 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-snappy-purple"></div>
						</label>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-gray-900">Sons</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={settings.soundEnabled}
								onChange={(e) =>
									handleSettingChange(
										"soundEnabled",
										e.target.checked
									)
								}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-purple-100 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-snappy-purple"></div>
						</label>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-gray-900">Mode sombre</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={settings.darkMode}
								onChange={(e) =>
									handleSettingChange(
										"darkMode",
										e.target.checked
									)
								}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-purple-100 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-snappy-purple"></div>
						</label>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-gray-900">Langue</span>
						<select
							value={settings.language}
							onChange={(e) =>
								handleSettingChange("language", e.target.value)
							}
							className="p-2 border border-purple-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
						>
							<option value="fr">Français</option>
							<option value="en">English</option>
						</select>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-gray-900">Statut</span>
						<select
							value={settings.status}
							onChange={(e) =>
								handleSettingChange("status", e.target.value)
							}
							className="p-2 border border-purple-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
						>
							<option value="active">Actif</option>
							<option value="away">Absent</option>
							<option value="busy">Occupé</option>
							<option value="invisible">Invisible</option>
						</select>
					</div>
				</div>
			</div>

			{/* Account Actions */}
			<div className="bg-white rounded-lg shadow-lg p-6 border border-purple-100">
				<h2 className="text-xl font-semibold mb-4 text-gray-900">
					Actions du compte
				</h2>
				<div className="space-y-4">
					<button
						onClick={handleLogout}
						className="w-full p-3 text-white bg-snappy-purple rounded-lg hover:bg-opacity-90 transition-colors"
					>
						Déconnexion
					</button>
					<button
						onClick={() => setShowDeactivateModal(true)}
						className="w-full p-3 text-white bg-purple-800 rounded-lg hover:bg-opacity-90 transition-colors"
					>
						Désactiver le compte
					</button>
				</div>
			</div>

			{/* Deactivate Account Modal */}
			{showDeactivateModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full m-4 border border-purple-100">
						<h3 className="text-xl font-bold mb-4 text-gray-900">
							Désactiver le compte
						</h3>
						<p className="text-gray-900 mb-6">
							Êtes-vous sûr de vouloir désactiver votre compte ?
							Cette action est irréversible.
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setShowDeactivateModal(false)}
								className="px-4 py-2 text-gray-900 hover:text-purple-700"
							>
								Annuler
							</button>
							<button
								onClick={handleDeactivateAccount}
								className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-opacity-90"
							>
								Désactiver
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
