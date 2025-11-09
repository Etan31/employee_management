import { useState, useEffect } from "react";
import { useSuggestions } from "../../hooks/useSuggestions.js";
import Modal from "../Modal";
import IcPlus from "../../../icons/ic-plus.svg";
import IcEvent from "../../../icons/ic-event.svg";
import "./addEventModal.css";
import LocationInput from "../../LocationInput.jsx";

export default function AddEventModal({
  isOpen,
  onClose,
  formData = {},
  onChange = () => {},
}) {
  const [cityQuery, setCityQuery] = useState("");
  const [municipalityQuery, setMunicipalityQuery] = useState("");

  // Initialize empty fields if undefined
  useEffect(() => {
    if (!formData.city) onChange({ target: { name: "city", value: "" } });
    if (!formData.municipality)
      onChange({ target: { name: "municipality", value: "" } });
  }, []);

  const citySuggestions = useSuggestions(cityQuery, "cities");
  const municipalitySuggestions = useSuggestions(
    municipalityQuery,
    "municipalities"
  );
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
      <form className="form-event">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" placeholder="Title" />

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
        ></textarea>

        <LocationInput
          label="City"
          name="city"
          value={formData.city}
          onChange={onChange}
          query={cityQuery}
          setQuery={setCityQuery}
          suggestions={citySuggestions}
        />

        <LocationInput
          label="Municipality"
          name="municipality"
          value={formData.municipality}
          onChange={onChange}
          query={municipalityQuery}
          setQuery={setMunicipalityQuery}
          suggestions={municipalitySuggestions}
        />

        <label htmlFor="participants">Participants</label>
        <input
          id="participants"
          name="participants"
          type="text"
          value={formData.participants}
          placeholder="Participants"
        />

        <fieldset className="event-date-and-time">
          <legend>Date and Time</legend>

          <input
            type="number"
            name="month"
            placeholder="MM"
            aria-label="Month"
            value={formData.month}
            onChange={onChange}
            required
          />
          <input
            type="number"
            name="day"
            placeholder="DD"
            aria-label="Day"
            value={formData.day}
            onChange={onChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="YYYY"
            aria-label="Year"
            value={formData.year}
            onChange={onChange}
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
