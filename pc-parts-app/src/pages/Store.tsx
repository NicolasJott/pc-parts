import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "../components";

const Store = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Store;
