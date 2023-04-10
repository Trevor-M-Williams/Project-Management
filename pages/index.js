import Nav from "../components/Nav";
import Table from "../components/Table";
import TaskProvider from "../contexts/TaskContext";

const Home = () => {
  return (
    <div className="absolute inset-0 overflow-hidden p-4">
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <TaskProvider>
          <Nav />
          <Table />
        </TaskProvider>
      </div>
    </div>
  );
};

export default Home;
