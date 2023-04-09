import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ assigned, handleChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={assigned}
          label="Assigned To"
          onChange={handleChange}
        >
          <MenuItem value="CJ">CJ</MenuItem>
          <MenuItem value="Logan">Logan</MenuItem>
          <MenuItem value="Trevor">Trevor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
