import React, { useState, useEffect, useContext } from "react";
import { Auth } from "./context/AuthContext";
import AppBar from "@mui/material/AppBar";
//import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import app from "./firebase/firebase";

import {
  Button,
  Container,
  Box,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeIcon from "@mui/icons-material/Home";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { ThemeProvider, createTheme } from "@mui/material/styles";
//import { makeStyles } from "@mui/material/styles";
//import { makeStyles } from '@material-ui/core/styles';

import { makeStyles } from "@material-ui/styles";
import { fontWeight } from "@mui/system";

const useStyles = makeStyles({
  select: {
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiOutlinedInput-input": {
      //color: "green"
    },
    "&:hover .MuiOutlinedInput-input": {
      //color: "red"
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiInputLabel-outlined": {
      fontWeight: "bold",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black",
      fontWeight: "bold",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black",
    },
  },
});

function App(props) {
  const classes = useStyles();
  const { usuario } = useContext(Auth);
  const [nombre, setnombre] = useState(null);
  const history = useHistory();
  const [hogar, setHogar] = useState("Casa 1");

  useEffect(() => {
    if (usuario === null) {
      history.push("/login");
    }

    usuario
      ? usuario.displayName
        ? setnombre(usuario.displayName)
        : setnombre(usuario.email)
      : setnombre(null);
  }, [history, usuario]);

  const cambiarHogar = (event) => {
    setHogar(event.target.value);
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            onClick={() => {
              history.push("/");
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KitchenIcon />
          </ListItemIcon>
          <ListItemText
            primary="Stock"
            onClick={() => {
              history.push("/stock");
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PendingActionsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Mis Listas"
            onClick={() => {
              history.push("/listas");
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText
            primary="Recetas"
            onClick={() => {
              history.push("/recetas");
            }}
          />
        </ListItem>
      </List>

      <Divider />

      <ListItem button onClick={() => app.auth().signOut()}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión" />
      </ListItem>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="navbar">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Hola {nombre}
          </Typography>

          <FormControl classes={{ root: classes.select }} sx={{ mr: 4 }}>
            <InputLabel id="demo-simple-select-label">Hogar</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hogar}
              label="Hogar"
              onChange={cambiarHogar}
              sx={{ width: "100%", height: "40px" }}
            >
              <MenuItem value={"Casa 1"}>Casa 1</MenuItem>
              <MenuItem value={"Casa 2"}>Casa 2</MenuItem>
            </Select>
          </FormControl>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <React.Fragment key={"right"}>
              <MenuIcon onClick={toggleDrawer("right", true)} />
              <SwipeableDrawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
              >
                {list("right")}
              </SwipeableDrawer>
            </React.Fragment>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default App;
