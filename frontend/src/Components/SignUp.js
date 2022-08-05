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

const btc_amount = 0;

export default function SignUp() {
  const [signUp, setSignUp] = useState({
    fullName: "",
    email: "",
  });

  const addCustomer = () => {
    const name = signUp.fullName;
    const email = signUp.email;
    console.log(name, email);
    if (name && email) {
      axios
        .post("http://localhost:8080/wallet", { btc_amount })
        .then((response) => {
          axios.post("http://localhost:8080/customer", { name, email });
        });
    }
  };

  function handleChange(value, name) {
    setSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSignUp() {
    if (!signUp.fullName || !signUp.email) {
      alert("Please fill out all fields.");
    } else {
      addCustomer();
    }
  }

  function handleClear() {
    setSignUp({ fullName: "", email: "" });
  }

  return (
    <>
      <h3 style={{ marginLeft: 22, marginTop: 50 }}>Sign Up</h3>
      <div
        style={{
          display: "flex",
          height: 400,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl variant="standard" style={{ margin: 20, width: 200 }}>
          <InputLabel>Full Name</InputLabel>
          <Input
            autoComplete="off"
            value={signUp.fullName}
            type="text"
            onChange={(e) => handleChange(e.target.value, "fullName")}
          />
        </FormControl>
        <FormControl variant="standard" style={{ margin: 20, width: 250 }}>
          <InputLabel>Email</InputLabel>
          <Input
            autoComplete="off"
            value={signUp.email}
            type="text"
            onChange={(e) => handleChange(e.target.value, "email")}
          />
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          height: 200,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <ThemeProvider theme={theme}>
          <Button color="primary" variant="contained" onClick={handleClear}>
            Clear
          </Button>
          <Button color="primary" variant="contained" onClick={handleSignUp}>
            Sign up
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
}
