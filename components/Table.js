import { DataGrid } from "@mui/x-data-grid";

const Table = ({ data }) => {
  const columns = [
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "client", headerName: "Client", minWidth: 150, flex: 1 },
    { field: "assigned", headerName: "Assigned To", minWidth: 150, flex: 1 },
    {
      field: "dueDate",
      headerName: "Due Date",
      minWidth: 150,
      flex: 1,
      valueFormatter: (params) => {
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
        filterModel={{
          items: [
            {
              columnField: "status",
              operatorValue: "=",
              value: "true",
            },
          ],
        }}
      />
    </div>
  );
};

export default Table;
