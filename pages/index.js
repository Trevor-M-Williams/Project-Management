import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Table from "../components/Table";
import { getTasks } from "../firebase";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(
    tasks.filter((e) => e.status === 1)
  );
  const [filterStatus, setFilterStatus] = useState(1);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  function handleOpen() {
    setModalOpen(true);
  }

  const toggleFilter = () => {
    if (filterStatus === 1) {
      setFilterStatus(0);
      setFilteredTasks(tasks.filter((e) => e.status !== 1));
    } else {
      setFilterStatus(1);
      setFilteredTasks(tasks.filter((e) => e.status === 1));
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden p-4">
      <div className="flex flex-col h-full max-w-5xl mx-auto">
        <Nav handleOpen={handleOpen} toggleFilter={toggleFilter} />
        <Table data={tasks} />
      </div>
    </div>
  );
};

export default Home;
