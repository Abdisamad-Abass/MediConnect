import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Booking from "./Pages/Booking";
import Message from "./Pages/Message";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/landing" element={<Home />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/send-message" element={<Message />} />
      </Routes>
    </>
  );
}

export default App;
