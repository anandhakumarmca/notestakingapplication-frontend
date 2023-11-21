import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import Info from "./Components/Info";
import Home from "./Components/Home";
import SearchNotes from "./Components/SearchNotes"; 
import About from "./Components/About";
import AddNotes from "./Components/AddNotes";
import EditNotes from "./Components/EditNote";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserActivation from "./Components/UserActivation";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import VerifyRandomString from "./Components/VerifyRandomString";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/getAllNotes/:userId" element={<Home />} />
        <Route path="/searchNotes/:userId" element={<SearchNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addNotes" element={<AddNotes />} />
        <Route path="/editNote/:id" element={<EditNotes />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:activationToken" element={<UserActivation />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/verifyRandomString/:randomString"
          element={<VerifyRandomString />}
        />
        <Route
          path="/resetPassword/:randomString"
          element={<ResetPassword />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
