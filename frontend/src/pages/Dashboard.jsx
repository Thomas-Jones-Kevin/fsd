import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api"; 

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  // 🔹 Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error(
        "Error fetching events:",
        error.response?.data?.message || error.message
      );
      alert("Failed to load events. Please check your connection or login status.");
    }
  };

  // 🔹 Delete an event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await API.delete(`/events/${id}`);
        alert("✅ Event deleted successfully!");
        fetchEvents(); // Refresh the list
      } catch (error) {
        console.error(
          "Error deleting event:",
          error.response?.data?.message || error.message
        );
        alert(`❌ Failed to delete event: ${error.response?.data?.message || "Server error."}`);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="center">🎉 Event Dashboard</h2>
      <p className="center text-muted mt-2">
        View, edit, or delete your events here.
      </p>

      {/* Add Event Button */}
      <div className="center mt-3">
        <Link to="/add">
          <button>➕ Add New Event</button>
        </Link>
      </div>

      {/* Event Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        {events.length === 0 ? (
          <p className="center text-muted">No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              {event.photoUrl && (
                <img src={event.photoUrl} alt="Event" loading="lazy" />
              )}

              <h3>{event.title}</h3>
              <p>{event.description}</p>

              <p>
                <b>Date:</b>{" "}
                {event.date
                  ? new Date(event.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <Link to={`/edit/${event._id}`}>
                  <button style={{ backgroundColor: "#28a745" }}>Edit</button>
                </Link>

                <button
                  style={{ backgroundColor: "#dc3545" }}
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
