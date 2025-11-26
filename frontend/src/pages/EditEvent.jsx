import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api"; // Ensure this path is correct

// 🔹 Helper: Format a Date object into 'YYYY-MM-DD' for <input type="date" />
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 State initialization
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    tag: "",
    mood: "",
    photoUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Fetch the specific event data on mount
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        const fetchedEvent = res.data;

        // Format date for input and set event state
        setEvent({
          ...fetchedEvent,
          date: formatDateForInput(fetchedEvent.date),
        });
      } catch (error) {
        console.error("Error fetching event for edit:", error);
        alert("Failed to load event data. Check your API route.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // 🔹 Handle form submission (Update event)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.patch(`/events/${id}`, event);
      alert("✅ Event updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error updating event:",
        error.response?.data?.message || error.message
      );
      alert("❌ Failed to update event. See console for details.");
    }
  };

  // 🔹 Show loading indicator
  if (isLoading) {
    return <div className="center mt-3">Loading event details...</div>;
  }

  return (
    <div className="form-container">
      <h3>Edit Event</h3>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          required
        />
        <br />

        <label>Description</label>
        <textarea
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
        <br />

        <label>Date</label>
        <input
          type="date"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          required
        />
        <br />

        <label>Tag</label>
        <input
          placeholder="Tag"
          value={event.tag}
          onChange={(e) => setEvent({ ...event, tag: e.target.value })}
        />
        <br />

        <label>Mood (Emoji)</label>
        <input
          placeholder="Mood (emoji)"
          value={event.mood}
          onChange={(e) => setEvent({ ...event, mood: e.target.value })}
        />
        <br />

        <label>Photo URL</label>
        <input
          placeholder="Photo URL"
          value={event.photoUrl}
          onChange={(e) => setEvent({ ...event, photoUrl: e.target.value })}
        />
        <br />

        <button type="submit" style={{ width: "100%" }}>
          Update Event
        </button>
      </form>
    </div>
  );
}
