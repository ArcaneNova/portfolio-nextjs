import { Metadata } from "next";
import LaunchesClient from "@/components/admin/launches-client";

export const metadata: Metadata = {
  title: "Launches Management",
  description: "Manage your project and app launches",
};

export default function LaunchesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Launches Management</h1>
      <LaunchesClient />
    </div>
  );
}
