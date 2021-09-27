import logo from "./logo.svg";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import Singup from "./views/Signup";
import Stock from "./views/Stock";
import Listas from "./views/Listas";
import Recetas from "./views/Recetas";
import Navbar from "./navbar";

function App() {
  return (
    <AuthContext>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/singup">
            <Singup />
          </Route>
          <Route exact path="/stock">
            <Navbar />
            <Stock />
          </Route>
          <Route exact path="/listas">
            <Navbar />
            <Listas />
          </Route>
          <Route exact path="/recetas">
            <Navbar />
            <Recetas />
          </Route>
        </Switch>
      </Router>
    </AuthContext>
  );
}

export default App;
