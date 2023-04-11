import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { DataGrid } from "@mui/x-data-grid";
import { updateTask, deleteTask } from "../firebase";
import dayjs from "dayjs";

const Table = () => {
  const { filteredTasks, setTaskData } = useContext(TaskContext);
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
              onClick={(e) => e.stopPropagation()}
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
      width: 120,
      headerAlign: "right",
      align: "right",
      sortComparator: (v1, v2) => dayjs(v1).valueOf() - dayjs(v2).valueOf(),
    },
  ];

  function updateTaskStatus(params) {
    const updatedTask = {
      ...params.row,
      status: !params.row.status,
    };
    updateTask(updatedTask);
  }

  return (
    <div className="w-full grow">
      <DataGrid
        rows={filteredTasks}
        columns={columns}
        pageSize={10}
        rowSelectionModel={[]}
        onRowClick={(e) => {
          setTaskData({
            ...e.row,
            dueDate: dayjs(e.row.dueDate, "M/D/YYYY"),
          });
        }}
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
        className="md:text-base"
      />
    </div>
  );
};

export default Table;
