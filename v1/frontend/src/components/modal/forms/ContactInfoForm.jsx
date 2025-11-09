import { useState, useEffect } from "react";
import { useSuggestions } from "../../hooks/useSuggestions";
import LocationInput from './../../LocationInput.jsx';
import "./ContactInfoForm.css";

function ContactInfoForm({ formData, onChange }) {
  const [cityQuery, setCityQuery] = useState("");
  const [municipalityQuery, setMunicipalityQuery] = useState("");

  // Initialize empty fields if undefined
  useEffect(() => {
    if (!formData.city) onChange({ target: { name: "city", value: "" } });
    if (!formData.municipality) onChange({ target: { name: "municipality", value: "" } });
  }, []);

  const citySuggestions = useSuggestions(cityQuery, "cities");
  const municipalitySuggestions = useSuggestions(municipalityQuery, "municipalities");

  return (
    <div className="form contact-info">
      <label htmlFor="phone_number" className="required">Phone Number</label>
      <input
        type="text"
        name="phone_number"
        placeholder="Phone number"
        value={formData.phone_number}
        onChange={onChange}
        required
      />

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
    </div>
  );
}

export default ContactInfoForm;
