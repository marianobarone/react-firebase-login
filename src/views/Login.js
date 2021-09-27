import React, { useState, useContext, useEffect } from "react";
import { Auth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  FormHelperText,
} from "@material-ui/core";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// Imports libreria Material Ui

function Login(props) {
  const { usuario } = useContext(Auth);
  const context = useContext(Auth);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState("");
  const [passwordValidationError, setPasswordEmailValidationError] =
    useState("");

  useEffect(() => {
    if (usuario) {
      history.push("/");
    }
  }, [usuario]);

  function login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        console.log(user.displayName);
        console.log(token);
        history.push("/");

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  }

  function nuevoUsuario() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, "prueba@gmail.com", "nuevo1234")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Nuevo usuario:", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  }

  function ingresarConEmail() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setEmailValidationError("Credenciales inválidas");
        setPasswordEmailValidationError("Credenciales inválidas");
        //helperText={emailValidationError}
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

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ my: 2 }}
        >
          <Button variant="contained" onClick={() => ingresarConEmail()}>
            Ingresar
          </Button>

          <Button
            component={Link}
            to="/singup"
            variant="contained"
            color="primary"
          >
            Registrarse
          </Button>
        </Stack>

        <Grid m={2}>
          <GoogleButton label="Ingresar con Google" onClick={login} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
