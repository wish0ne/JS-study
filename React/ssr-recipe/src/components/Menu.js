import React from "react";
import { Link, Outlet } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/red">Red</Link>
        </li>
        <li>
          <Link to="/blue">Blue</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </>
  );
};

export default Menu;
