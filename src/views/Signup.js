import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,  
} from "firebase/auth";

// Imports libreria Material Ui
import {
  Grid,
  TextField,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormControl, 
  Stack,
  Button,
  FormHelperText
} from '@material-ui/core'

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// Imports libreria Material Ui

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Singup(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState("");
  const [passwordValidationError, setPasswordEmailValidationError] = useState("");
  
  const auth = getAuth();
  const history = useHistory();
  
  function nuevoUsuario() {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;        
        history.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setEmailValidationError("Credenciales inválidas");
        setPasswordEmailValidationError("Credenciales inválidas");
        // ..
      });
  }

  function validateEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      setEmailValidationError("");
      setEmail(email);
    } else if (email != "") {
      setEmailValidationError("Email inválido");
    } else {
      setEmailValidationError("");
    }
  }

  function validatePassword(password) {
    if (password.length >= 1 || password == "") {
      setPasswordEmailValidationError("");
      setPassword(password);
    }
  }

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        item
        className="login-card"
        container
        display="flex"
        direction="column"
        justifyContent="center"
        justify="center"
        alignItems="center"
        lg={4}
        md={5}
        xs={10}
        py={6}
      >
        <div>
          <h2>Usuario Nuevo</h2>
          <hr></hr>
        </div>
        <Grid>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => validateEmail(e.target.value)}
            error={emailValidationError != ""}
            helperText={emailValidationError}
            sx={{ m: 1, width: "25ch" }}
          />
        </Grid>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            className={passwordValidationError != "" ? "Mui-error" : ""}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => validatePassword(e.target.value)}
            error={passwordValidationError != ""}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setshowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />

          <FormHelperText sx={{ color: "#d32f2f" }}>
            {passwordValidationError ? passwordValidationError : ""}
          </FormHelperText>
        </FormControl>

        <Stack spacing={2} direction="row" m={2}>
          <Button
            component={Link}
            to="/singup"
            variant="contained"
            color="primary"
            onClick={() => nuevoUsuario()}
          >
            Registrarse
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Singup;