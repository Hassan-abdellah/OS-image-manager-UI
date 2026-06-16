import { Fragment } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
const PublicLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="page-height">
        <Outlet />
      </main>
      <Toaster closeButton={true} position="top-center" />
    </Fragment>
  );
};

export default PublicLayout;
