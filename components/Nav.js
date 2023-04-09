import React from "react";
import BasicModal from "./Modal";
import Switch from "@mui/material/Switch";

function Nav({ toggleFilter }) {
  return (
    <div className="w-full flex items-center justify-between pb-4">
      <div>Tasks</div>
      <div className="flex items-center">
        <BasicModal />
        <Switch onClick={toggleFilter} />
      </div>
    </div>
  );
}

export default Nav;
