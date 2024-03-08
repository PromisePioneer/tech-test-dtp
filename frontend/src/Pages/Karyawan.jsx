import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";

function Karyawan() {
  return (
    <>
      <Navbar />
      <div className="dark:bg-slate-900 bg-gray-50 flex h-full items-center py-[145px]">
        <main className="w-full p-6 flex justify-center">
          <Outlet />
          <Toaster />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Karyawan;
