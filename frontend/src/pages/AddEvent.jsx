import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AddEvent() {
  const [event, setEvent] = useState({ title: "", description: "", date: "", tag: "", mood: "", photoUrl: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/events", event);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={(e) => setEvent({ ...event, title: e.target.value })} /><br />
        <textarea placeholder="Description" onChange={(e) => setEvent({ ...event, description: e.target.value })}></textarea><br />
        <input type="date" onChange={(e) => setEvent({ ...event, date: e.target.value })} /><br />
        <input placeholder="Tag" onChange={(e) => setEvent({ ...event, tag: e.target.value })} /><br />
        <input placeholder="Mood (emoji)" onChange={(e) => setEvent({ ...event, mood: e.target.value })} /><br />
        <input placeholder="Photo URL" onChange={(e) => setEvent({ ...event, photoUrl: e.target.value })} /><br />
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
}
