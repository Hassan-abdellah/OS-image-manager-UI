import { Fragment } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="page-height">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default PublicLayout;
