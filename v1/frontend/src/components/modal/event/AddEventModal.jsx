import { useState, useEffect } from "react";
import { useSuggestions } from "../../hooks/useSuggestions.js";
import Modal from "../Modal";
import IcPlus from "../../../icons/ic-plus.svg";
import IcEvent from "../../../icons/ic-event.svg";
import "./addEventModal.css";
import LocationInput from "../../LocationInput.jsx";

export default function AddEventModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    municipality: "",
    participants: "",
    month: "",
    day: "",
    year: "",
    attachment: null,
  });

  const [cityQuery, setCityQuery] = useState("");
  const [municipalityQuery, setMunicipalityQuery] = useState("");

  // Auto-fill empty fields (optional safeguard)
  useEffect(() => {
    if (!formData.city) setFormData((prev) => ({ ...prev, city: "" }));
    if (!formData.municipality)
      setFormData((prev) => ({ ...prev, municipality: "" }));
  }, []);

  // Fetch suggestions using your hook
  const citySuggestions = useSuggestions(cityQuery, "cities");
  const municipalitySuggestions = useSuggestions(municipalityQuery, "municipalities");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/addevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      alert("Event added successfully!");
      onClose();
      setFormData({
        title: "",
        description: "",
        city: "",
        municipality: "",
        participants: "",
        month: "",
        day: "",
        year: "",
        attachment: null,
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="modal-header">
        <div className="left">
          <img src={IcEvent} alt="event" />
          <div className="header-text">
            <h2>Create Event</h2>
            <p>Fill in the data below to add event</p>
          </div>
        </div>
        <button onClick={onClose}>
          <img src={IcPlus} alt="close" className="btn-close" />
        </button>
      </header>

      <form className="form-event" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="input-textarea"
          placeholder="Type description for the upcoming event."
          role="textbox"
          rows="4"
          cols="50"
          maxLength={500}
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <LocationInput
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          query={cityQuery}
          setQuery={setCityQuery}
          suggestions={citySuggestions}
        />

        <LocationInput
          label="Municipality"
          name="municipality"
          value={formData.municipality}
          onChange={handleChange}
          query={municipalityQuery}
          setQuery={setMunicipalityQuery}
          suggestions={municipalitySuggestions}
        />

        <label htmlFor="participants">Participants</label>
        <input
          id="participants"
          name="participants"
          type="text"
          placeholder="Participants"
          value={formData.participants}
          onChange={handleChange}
        />

        <fieldset className="event-date-and-time">
          <legend>Date and Time</legend>

          <input
            type="number"
            name="month"
            placeholder="MM"
            aria-label="Month"
            value={formData.month}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="day"
            placeholder="DD"
            aria-label="Day"
            value={formData.day}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="YYYY"
            aria-label="Year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </fieldset>

        <label htmlFor="attachment">Attachment (PDF)</label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept="application/pdf"
          title="Upload PDF file"
          onChange={handleChange}
        />

        <div className="toggleBtn">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
