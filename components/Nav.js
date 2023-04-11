import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import BasicModal from "./Modal";
import Switch from "@mui/material/Switch";

function Nav() {
  const { filterStatus, setFilterStatus } = useContext(TaskContext);

  function toggleFilter() {
    setFilterStatus((prev) => !prev);
  }

  return (
    <div className="flex w-full items-center justify-between pb-4">
      <div className="text-lg font-medium uppercase">
        {filterStatus ? "Completed" : "Todo"}
      </div>
      <div className="flex items-center">
        <BasicModal />
        <Switch onClick={toggleFilter} />
      </div>
    </div>
  );
}

export default Nav;
