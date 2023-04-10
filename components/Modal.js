import * as React from "react";
import BasicSelect from "./Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { postTask } from "../firebase";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [taskData, setTaskData] = React.useState({});
  const [validationError, setValidationError] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setTaskData({ ...taskData, assigned: e.target.value });
  };

  function createTask(e) {
    e.preventDefault();
    if (!taskData.dueDate) {
      setValidationError(true);
      return;
    } else {
      setValidationError(false);
    }
    const data = {
      ...taskData,
      dueDate: taskData.dueDate.$d.toLocaleDateString(),
      status: false,
    };
    postTask(data);
    handleClose();
  }

  return (
    <div>
      <AddCircleOutlineRoundedIcon
        onClick={handleOpen}
        className="cursor-pointer text-blue-400"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute left-1/2 top-1/2 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow-lg focus:outline-none md:w-1/2">
          <div className="mb-4 text-2xl font-medium">New Task</div>
          <form onSubmit={createTask} className="flex flex-col gap-4">
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) =>
                setTaskData({ ...taskData, name: e.target.value })
              }
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              required
            />
            <TextField
              label="Client"
              variant="outlined"
              onChange={(e) =>
                setTaskData({ ...taskData, client: e.target.value })
              }
              required
            />
            <BasicSelect
              taskData={taskData}
              handleChange={handleChange}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={taskData.dueDate}
                onChange={(newDate) =>
                  setTaskData({ ...taskData, dueDate: newDate })
                }
                required
              />
              {validationError && (
                <p className="mt-1 text-red-500">Please select a date.</p>
              )}
            </LocalizationProvider>

            <button
              type="submit"
              className="mt-2 self-start rounded bg-blue-400 p-2 text-white hover:bg-blue-500"
            >
              Create Task
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
