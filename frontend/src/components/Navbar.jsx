import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <h2 style={{ display: "inline-block", marginRight: "20px" }}>EventSnap</h2>
      {token ? (
        <>
          <Link to="/" style={{ color: "white", marginRight: "10px" }}>Dashboard</Link>
          <Link to="/add" style={{ color: "white", marginRight: "10px" }}>Add Event</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "white", marginRight: "10px" }}>Login</Link>
          <Link to="/register" style={{ color: "white" }}>Register</Link>
        </>
      )}
    </nav>
  );
}
