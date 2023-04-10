import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { DataGrid } from "@mui/x-data-grid";
import { updateTask } from "../firebase";

const Table = () => {
  const { filteredTasks } = useContext(TaskContext);
  const columns = [
    {
      field: "status",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="checkbox"
              checked={params.value}
              onChange={() => updateTaskStatus(params)}
              className="ml-2 cursor-pointer"
            />
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", minWidth: 100, flex: 1 },
    {
      field: "client",
      headerName: "Client",
      minWidth: 100,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "assigned",
      headerName: "Assigned To",
      minWidth: 100,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 100,
      headerAlign: "right",
      align: "right",
      valueGetter: (params) => {
        const date = new Date(params.value);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${month}-${day}-${year}`;
      },
    },
  ];

  function updateTaskStatus(params) {
    const updatedTask = {
      ...params.row,
      status: !params.row.status,
    };
    console.log(updatedTask.status);
    updateTask(updatedTask);
  }

  return (
    <div className="w-full grow">
      <DataGrid
        rows={filteredTasks}
        columns={columns}
        pageSize={10}
        rowSelectionModel={[]}
        onRowClick={(e) => console.log(e)}
        initialState={{
          filter: {
            items: [
              {
                columnField: "status",
                operatorValue: "=",
                value: "true",
              },
            ],
          },
          sorting: {
            sortModel: [{ field: "dueDate", sort: "asc" }],
          },
        }}
      />
    </div>
  );
};

export default Table;
