import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Table from "../components/Table";
import { getTasks } from "../firebase";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(
    tasks.filter((e) => e.status === false)
  );
  const [filterStatus, setFilterStatus] = useState(false);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  useEffect(() => {
    if (filterStatus) {
      setFilteredTasks(tasks.filter((e) => e.status === true));
    } else {
      setFilteredTasks(tasks.filter((e) => e.status === false));
    }
  }, [tasks]);

  function handleOpen() {
    setModalOpen(true);
  }

  const toggleFilter = () => {
    if (filterStatus) {
      setFilterStatus(false);
      setFilteredTasks(tasks.filter((e) => e.status == false));
    } else {
      setFilterStatus(1);
      setFilteredTasks(tasks.filter((e) => e.status == true));
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden p-4">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <Nav handleOpen={handleOpen} toggleFilter={toggleFilter} />
        <Table data={filteredTasks} />
      </div>
    </div>
  );
};

export default Home;
