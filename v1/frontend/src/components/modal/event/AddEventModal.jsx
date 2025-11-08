import Modal from "../Modal";
import IcPlus from "../../../icons/ic-plus.svg";
import IcEvent from "../../../icons/ic-event.svg";
import "./addEventModal.css";

export default function AddEventModal({ isOpen, onClose }) {
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
      <form>
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

        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Location"
        />

        <label htmlFor="participants">Participants</label>
        <input
          id="participants"
          name="participants"
          type="text"
          placeholder="Participants"
        />

        <fieldset className="event-date-and-time">
          <legend>Date and Time</legend>

          <label htmlFor="event_date" className="visually-hidden">
            Date
          </label>
          <input
            id="event_date"
            type="number"
            name="event_date"
            placeholder="Date"
            aria-label="Date"
          />

          <label htmlFor="event_hour" className="visually-hidden">
            Hour
          </label>
          <input
            id="event_hour"
            type="number"
            name="event_hour"
            placeholder="HH"
            aria-label="Hour"
          />

          <label htmlFor="event_minutes" className="visually-hidden">
            Minutes
          </label>
          <input
            id="event_minutes"
            type="number"
            name="event_minutes"
            placeholder="MM"
            aria-label="Minutes"
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
