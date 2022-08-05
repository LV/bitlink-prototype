import React, { useState } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
    },
  },
});

export default function UpdateInformation(props) {
  const { customerData } = props;
  const [updatedInfo, setUpdatedInfo] = useState({
    name: customerData.name,
    email: customerData.email,
  });

  function handleUpdateInfo() {
    axios.put(
      `http://localhost:8080/customer/${customerData.customer_id}`,
      updatedInfo
    );
  }

  function handleChange(value, name) {
    setUpdatedInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div
      style={{
        display: "flex",
        height: 10,
        marginTop: 90,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl variant="standard" style={{ margin: 20, width: 200 }}>
        <InputLabel>Full Name</InputLabel>
        <Input
          autoComplete="off"
          type="text"
          onChange={(e) => handleChange(e.target.value, "name")}
        />
      </FormControl>
      <FormControl variant="standard" style={{ margin: 20, width: 250 }}>
        <InputLabel>Email</InputLabel>
        <Input
          autoComplete="off"
          type="text"
          onChange={(e) => handleChange(e.target.value, "email")}
        />
      </FormControl>
      <ThemeProvider theme={theme}>
        <Button color="primary" variant="contained" onClick={handleUpdateInfo}>
          Submit
        </Button>
      </ThemeProvider>
    </div>
  );
}
