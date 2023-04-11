import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import BasicSelect from "./Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { postTask, updateTask, deleteTask } from "../firebase";

export default function BasicModal() {
  const { taskData, setTaskData } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const handleOpen = () => setTaskData({});
  const handleClose = () => setTaskData(null);
  const handleChange = (e) => {
    setTaskData({ ...taskData, assigned: e.target.value });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(e) {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "n") {
        handleOpen();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (taskData) setOpen(true);
    else setOpen(false);
  }, [taskData ?? null]);

  function handleCreate(e) {
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

  function handleUpdate(e) {
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
    };
    updateTask(data);
    handleClose();
  }

  function handleDelete() {
    deleteTask(taskData.id);
    handleClose();
  }

  const isNewTask = !taskData?.id;

  return (
    <div>
      <AddCircleOutlineRoundedIcon
        onClick={handleOpen}
        className="cursor-pointer text-blue-400"
      />
      {taskData && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-notes"
        >
          <Box className="absolute left-1/2 top-1/2 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow-lg focus:outline-none md:w-1/2">
            <div className="mb-4 text-2xl font-medium">
              {isNewTask ? "New Task" : "Edit Task"}
            </div>
            <form
              onSubmit={isNewTask ? handleCreate : handleUpdate}
              className="flex flex-col gap-4"
            >
              <TextField
                label="Name"
                variant="outlined"
                value={taskData.name || ""}
                onChange={(e) =>
                  setTaskData({ ...taskData, name: e.target.value })
                }
                required
              />
              <TextField
                label="Notes"
                variant="outlined"
                multiline
                value={taskData.notes || ""}
                onChange={(e) =>
                  setTaskData({ ...taskData, notes: e.target.value })
                }
              />
              <TextField
                label="Client"
                variant="outlined"
                value={taskData.client || ""}
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
                  value={taskData.dueDate || null}
                  onChange={(newDate) =>
                    setTaskData({ ...taskData, dueDate: newDate })
                  }
                  required
                />
                {validationError && (
                  <p className="mt-1 text-red-500">Please select a date.</p>
                )}
              </LocalizationProvider>

              <div className="mt-2 flex text-white">
                <button
                  type="submit"
                  className="self-start rounded bg-blue-500 p-2 hover:bg-blue-600"
                >
                  {isNewTask ? "Create Task" : "Update"}
                </button>

                {!isNewTask && (
                  <button
                    onClick={handleDelete}
                    className="ml-4 self-start rounded bg-red-500 p-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
