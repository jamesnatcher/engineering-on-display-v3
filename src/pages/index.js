import Image from "next/image";
import { Inter } from "next/font/google";
import ReactNavbar from "@/components/ReactNavbar";
import ReactGraphComponent from "@/components/ReactGraphComponent";
import ReactSettingsPage from "@/components/ReactSettingsPage";

export default function Home() {
  return (
    <div className="bg-white">
      <ReactNavbar />
      <ReactGraphComponent />
      <ReactSettingsPage />
    </div>
  );
}
