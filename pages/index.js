import React, { useState } from "react";
import Nav from "../components/Nav";
import Table from "../components/Table";
import { data } from "../data";

const Home = () => {
  const [filteredData, setFilteredData] = useState(
    data.filter((e) => e.status === 1)
  );
  const [filterStatus, setFilterStatus] = useState(1);

  const toggleFilter = () => {
    if (filterStatus === 1) {
      setFilterStatus(0);
      setFilteredData(data.filter((e) => e.status === 0));
    } else {
      setFilterStatus(1);
      setFilteredData(data.filter((e) => e.status === 1));
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="flex flex-col h-full max-w-5xl mx-auto">
        <Nav toggleFilter={toggleFilter} />
        <Table data={filteredData} />
      </div>
    </div>
  );
};

export default Home;
