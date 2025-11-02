import { useState } from "react";
import Modal from "./Modal";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ContactInfoForm from "./forms/ContactInfoForm";
import OrganizationalInfoForm from "./forms/OrganizationalInfoForm";
import "./Modal.css";
import IcPlus from "../../icons/ic-plus.svg";

export default function AddEmployeeModal({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeIndex !== slides.length - 1) {
      return; // Don't submit unless we're on the last slide
    }
    // submit logic here
  };

  const nextSlide = (e) => {
    e.preventDefault(); // Prevent any form submission
    if (activeIndex < 2) setActiveIndex(activeIndex + 1);
  };

  const prevSlide = (e) => {
    e.preventDefault(); // Prevent any form submission
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const slides = [
    { title: "Personal Information", form: <PersonalInfoForm /> },
    { title: "Contact Details", form: <ContactInfoForm /> },
    { title: "Organizational Information", form: <OrganizationalInfoForm /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="modal-header">
        <h2>Add New Employee</h2>
        <button onClick={onClose}>
          <img src={IcPlus} alt="close" className="btn-close" />
        </button>
      </header>

      <div className="carousel" id="slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === activeIndex ? "active" : ""}`}
          >
            {index > 0 && <span className="separator">&gt;</span>}
            <h3>{slide.title}</h3>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`form-group ${
              index === activeIndex ? "active" : "hidden"
            }`}
          >
            {slide.form}
          </div>
        ))}

        <div className="toggleBtn">
          {activeIndex > 0 && (
            <button type="button" className="back" onClick={prevSlide}>
              Back
            </button>
          )}

          {activeIndex === slides.length - 1 ? (
            <button type="submit" className="submit">
              Submit
            </button>
          ) : (
            <button type="button" className="next" onClick={nextSlide}>
              Next
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
