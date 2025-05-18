import type { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

const Layout: FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      command: () => navigate("/Register"),
    },
    {
      label: "Leads",
      command: () => navigate("/Leads"),
    },
  ];

  return (
    <>
      <Menubar model={items} />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
