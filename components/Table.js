import { DataGrid } from "@mui/x-data-grid";

const Table = ({ data }) => {
  const columns = [
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
        const year = date.getFullYear().toString().substr(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${month}-${day}-${year}`;
      },
    },
  ];

  return (
    <div className="grow w-full">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
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
