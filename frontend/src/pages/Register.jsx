import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  // --- 🎯 Validation Logic ---
  const validateForm = () => {
    const { username, email, password } = form;
    const minLength = 8; // Recommended minimum password length
    
    // 1. Basic Field Presence Check
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return false;
    }

    // 2. Email Format Validation
    if (!email.includes('@') || !email.includes('.')) {
        alert("Please enter a valid email address (must contain '@' and a domain like '.com').");
        return false;
    }

    // 3. Password Length Check (Adjusted to a more secure 8 characters)
    if (password.length < minLength) {
        alert(`Password must be at least ${minLength} characters long.`);
        return false;
    }

    // 4. Password Special Character Check (Requires at least one symbol or number)
    // Regex checks for at least one digit (0-9) OR at least one special symbol.
    const complexRegex = /(?=.*\d)|(?=.*[!@#$%^&*()_+={}[\]|:;"'<>,.?/~`-])/;
    if (!complexRegex.test(password)) {
        alert("Password must contain at least one number OR one special character.");
        return false;
    }

    return true; // Validation passed
   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Run validation before making the API call
    if (!validateForm()) {
        return; // Stop submission if validation fails
    }

    try {
      // If validation passes, attempt registration
      await API.post("/auth/register", form);
      alert("Registered successfully!");
       navigate("/login");
      } catch (error) {
        // Log the specific error message from the backend if available
        const errorMessage = error.response?.data?.message || "Registration failed due to a server error.";
        alert(errorMessage);
    }
  };

  return (
    <div className="form-container"> {/* Use the class for better styling */}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
            placeholder="Username" 
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
        /><br />
        
        <label>Email</label>
        <input 
            placeholder="Email" 
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
        /><br />
        
        <label>Password</label>
        <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
        /><br />
        
      <button type="submit">Register</button>
      </form>
      </div>
  );
}