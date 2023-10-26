import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {DragDropContext} from "react-beautiful-dnd"
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import User from "./components/userHome";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <DragDropContext>

    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={ <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tasks" element={<User />} />
        </Routes>
      </div>
    </Router>
    </DragDropContext>
  );
}

export default App;
