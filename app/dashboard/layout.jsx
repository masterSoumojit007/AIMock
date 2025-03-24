import Header from "@/components/Header";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="container mx-auto my-8 px-4">{children}</main>
    </div>
  );
}

export default DashboardLayout;
