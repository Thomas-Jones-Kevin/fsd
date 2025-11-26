import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="/edit/:id" element={<EditEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
